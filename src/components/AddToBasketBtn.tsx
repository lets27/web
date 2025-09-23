"use client";

import { ProductWithPrice, useBasketContext } from "@/lib/BaketContextProv";
import React, { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

interface AddToBasketBtnProps {
  product: ProductWithPrice;
}

const AddToBasketBtn = ({ product }: AddToBasketBtnProps) => {
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();
  const { addItem, getItemCount } = useBasketContext();
  const { openSignIn } = useClerk();

  const isInStock = (product.stock ?? 0) > 0;
  const quantity = getItemCount(product._id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="px-4 py-2 min-w-[2rem] text-center bg-gray-100 text-gray-800 rounded-full font-medium text-sm">
        {quantity}
      </span>

      <Button
        onClick={() => {
          if (!user) {
            openSignIn();
            return;
          }
          addItem(product);
        }}
        disabled={!isInStock}
        className="transition-all duration-300 hover:border hover:border-gray-400 hover:-translate-y-1 rounded-none"
      >
        Add to Basket
      </Button>
    </div>
  );
};

export default AddToBasketBtn;
