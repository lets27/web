"use client";

import { useBasketContext } from "@/lib/BaketContextProv";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Meta } from "@/actions/stripeChekout";

import CheckOutBtn from "@/components/checkoutBtn";
import WhatsAppBtn from "@/components/whatsappBtn";
import BasketTable from "@/components/ui/orderTable";

const Basket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { basketItems, getTotalPrice } = useBasketContext();
  const { user } = useUser();

  const totalPrice = getTotalPrice();

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
        window.location.href = data.url;
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
    const phoneNumber = process.env.NEXT_PUBLIC_OWNER_NUMBER;
    if (!phoneNumber) {
      console.error("Owner's WhatsApp number is not set!");
      return;
    }

    const itemsList = basketItems
      .map((item, idx) => {
        const productPageUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(
          /\/$/,
          ""
        )}/product/${item.product.slug.current}`;
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

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl font-playfair font-light tracking-tight text-gray-900 border-b pb-2">
            Your Basket
          </h1>

          {basketItems.length === 0 ? (
            <p className="text-gray-500 text-center italic text-lg">
              Your basket is empty.
            </p>
          ) : (
            <>
              <BasketTable basketItems={basketItems} totalPrice={totalPrice} />

              <div className="flex flex-col rounded-sm">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-800 border border-gray-300 px-4 py-2 w-fit font-poppins">
                  Order Summary
                </h3>

                <div className="border border-gray-300 px-4 py-6 bg-gray-50 flex flex-col gap-6 sm:flex-row items-center justify-between rounded-b-md shadow-sm">
                  <span className="text-xl font-thin text-gray-900 font-playfair tracking-tight">
                    Total: ${totalPrice.toFixed(2)}
                  </span>
                  <CheckOutBtn
                    isLoading={isLoading}
                    handleCheckOut={handleCheckOut}
                  />
                  <WhatsAppBtn
                    isLoading={isLoading}
                    handleOrder={handleWhatsAppRedirect}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basket;
