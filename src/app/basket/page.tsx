"use client";

import AddToBasketBtn from "@/components/AddToBasketBtn";
import { useBasketContext } from "@/lib/BaketContextProv";
import { urlFor } from "@/sanity/sanityImageBuilder";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Meta } from "@/actions/stripeChekout";
import Image from "next/image";
import CheckOutBtn from "@/components/checkoutBtn";
import WhatsAppBtn from "@/components/whatsappBtn";

const Basket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { basketItems, getTotalPrice } = useBasketContext();
  const { user } = useUser();

  const totalPrice = getTotalPrice(); // calculate total from context

  const handleCheckOut = async () => {
    try {
      setIsLoading(true);

      const metadata: Meta = {
        customerName: user?.fullName || "",
        orderNumber: crypto.randomUUID(),
        customerEmail: user?.emailAddresses[0]?.emailAddress || "",
        clerkUserId: user?.id || "",
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata, basketItems }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Checkout failed:", data.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleWhatsAppRedirect = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_OWNER_NUMBER; // owner's WhatsApp number
    if (!phoneNumber) {
      console.error("Owner's WhatsApp number is not set!");
      return;
    }

    // Build order message with product page links
    const itemsList = basketItems
      .map((item, idx) => {
        const productPageUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(
          /\/$/,
          ""
        )}/${item.product.slug.current}`;
        return `${idx + 1}. ${
          item.product.productName
        } - $${item.product.price?.toFixed(
          2
        )}\nProduct page: ${productPageUrl}`;
      })
      .join("\n\n");

    const message = `Hello, I’d like to order the following items:\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(
      2
    )}\n\nMy name: ${user?.fullName || "Guest"}`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank"); // opens WhatsApp with pre-filled message
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col min-h-[70vh]">
      <h1 className="text-2xl font-bold mb-6">Your Basket</h1>

      {basketItems.length === 0 && (
        <p className="text-gray-500">Your basket is empty.</p>
      )}

      <div className="flex-1 flex flex-col gap-4">
        {basketItems.map((basketItem) => {
          const product = basketItem.product;
          const imageUrl = product?.icon
            ? urlFor(product.icon)
                .height(50)
                .width(50)
                .quality(80)
                .auto("format")
                .url()
            : "https://placehold.co/50x50/png";

          return (
            <div
              key={product._id}
              className="flex items-center justify-between border rounded-lg p-3 shadow-sm"
            >
              {/* Image */}
              <Image
                src={imageUrl}
                alt="image"
                width={50}
                height={50}
                className="object-cover rounded-full"
              />

              {/* Product Info */}
              <div className="flex-1 px-4">
                <h2 className="text-lg font-semibold">
                  {product.productName || "No Name"}
                </h2>

                <p className="text-md font-bold mt-1">
                  ${product.price?.toFixed(2) || "0.00"}
                </p>
              </div>

              {/* Add to Basket Button */}
              <div className="ml-4">
                <AddToBasketBtn product={product} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Basket Total + Checkout Button */}
      {basketItems.length > 0 && (
        <div className="mt-6 flex flex-col gap-4 sm:flex-row items-center justify-between bg-white border border-gray-200 p-6 rounded-2xl shadow-lg">
          <span className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Your Total: ${totalPrice.toFixed(2)}
          </span>
          <CheckOutBtn isLoading={isLoading} handleCheckOut={handleCheckOut} />
          <WhatsAppBtn
            isLoading={isLoading}
            handleOrder={handleWhatsAppRedirect}
          />
        </div>
      )}
    </div>
  );
};

export default Basket;
