"use client";

import AddToBasketBtn from "@/components/AddToBasketBtn";
import { useBasketContext } from "@/lib/BaketContextProv";
import { urlFor } from "@/sanity/sanityImageBuilder";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Meta } from "@/actions/stripeChekout";
import Image from "next/image";

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
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-lg font-bold mb-2 sm:mb-0">
            Your Total: ${totalPrice.toFixed(2)}
          </span>
          <button
            onClick={handleCheckOut}
            className="px-6 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition"
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Basket;
