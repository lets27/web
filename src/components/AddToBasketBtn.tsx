"use client"; //zustand uses state so make file use client

import { ProductWithPrice, useBasketContext } from "@/lib/BaketContextProv";

import React, { useEffect, useState } from "react";

interface AddToBasketBtnProps {
  product: ProductWithPrice;
}

const AddToBasketBtn = ({ product }: AddToBasketBtnProps) => {
  const [isClient, setIsClient] = useState(false);

  // ✅ use context instead of zustand
  const { addItem, removeItem, getItemCount } = useBasketContext();
  const isInStock = (product.stock ?? 0) > 0;
  // Get quantity of this product
  const quantity = getItemCount(product._id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        disabled={!isInStock}
        className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:bg-red-300"
      >
        -
      </button>

      <span className="px-3 py-1 min-w-[2rem] text-center bg-gray-100 rounded">
        {quantity}
      </span>

      <button
        onClick={() => addItem(product)}
        disabled={!isInStock}
        className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-green-300"
      >
        +
      </button>
    </div>
  );
};

export default AddToBasketBtn;
