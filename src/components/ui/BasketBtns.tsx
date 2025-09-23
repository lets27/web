"use client";

import { ProductWithPrice, useBasketContext } from "@/lib/BaketContextProv";
import React, { useEffect, useState } from "react";

import { Button } from "./button";

interface AddToBasketBtnProps {
  product: ProductWithPrice;
}

const BasketBtns = ({ product }: AddToBasketBtnProps) => {
  const [isClient, setIsClient] = useState(false);

  const { addItem, removeItem, getItemCount } = useBasketContext();

  const isInStock = (product.stock ?? 0) > 0;
  const quantity = getItemCount(product._id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
      <Button
        onClick={() => removeItem(product._id)}
        disabled={!isInStock}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 text-white text-base sm:text-lg font-semibold disabled:bg-red-300 hover:bg-red-600 transition-colors duration-200"
      >
        –
      </Button>

      <span className="px-3 py-1 sm:px-4 sm:py-2 min-w-[2rem] text-center bg-gray-100 text-gray-800 rounded-full font-medium text-sm shadow-sm border border-gray-300">
        {quantity}
      </span>

      <Button
        onClick={() => addItem(product)}
        disabled={!isInStock}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white text-base sm:text-lg font-semibold disabled:bg-gray-300 hover:bg-gray-900 transition-colors duration-200"
      >
        +
      </Button>
    </div>
  );
};

export default BasketBtns;
