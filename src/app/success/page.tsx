// apps/web/src/app/success/page.tsx
"use client";

import { useBasketContext } from "@/lib/BaketContextProv";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams(); // URLSearchParams
  const sessionId = searchParams.get("session_id");
  const orderNumber = searchParams.get("orderNumber");

  const { clearBasket } = useBasketContext();

  useEffect(() => {
    console.log("Success page loaded with params:", { orderNumber, sessionId });
    if (sessionId) {
      console.log("Clearing basket after successful payment");
      try {
        clearBasket();
      } catch (error) {
        console.error("Error clearing basket:", error);
      }
    }
  }, [sessionId, clearBasket, orderNumber]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Payment Successful
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Thank you!
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment was processed successfully.
          </p>

          {orderNumber && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">Order number:</p>
              <p className="text-lg font-semibold text-gray-900">
                {orderNumber}
              </p>
            </div>
          )}

          {sessionId && (
            <p className="text-xs text-gray-500 mb-6">
              Stripe session: {sessionId}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex-1 min-w-[150px] text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex-1 min-w-[150px] text-center"
            >
              View Order Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
