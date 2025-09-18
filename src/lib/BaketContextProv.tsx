"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { Image as SanityImage } from "sanity";
// override price to always be required

export type ProductWithPrice = {
  _id: string;
  productName: string;
  slug: { current: string };
  category: { _ref: string; _type: string }[];
  description: string;
  icon: SanityImage | null;
  stock: number;
  price: number;
  relatedProducts?: {
    _key: string;
    asset: {
      _id: string;
      url: string | null;
    } | null;
  }[];
};

export interface BasketItem {
  product: ProductWithPrice;
  quantity: number;
}

interface BasketContextType {
  basketItems: BasketItem[];
  addItem: (product: ProductWithPrice) => void;
  removeItem: (productId: string) => void;
  getBasketCount: () => number;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  clearBasket: () => void;
}

// ----- Context -----
const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasketContext = () => {
  const context = useContext(BasketContext);
  if (!context)
    throw new Error("useBasketContext must be used within a BasketProvider");
  return context;
};

// ----- Provider -----
export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load basket from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem("basketItems");
    if (saved) setBasketItems(JSON.parse(saved));
    setHydrated(true);
  }, []);

  // ✅ Persist basket to localStorage whenever it changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }
  }, [basketItems, hydrated]);

  // ----- Actions -----
  const addItem = (product: ProductWithPrice) => {
    setBasketItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setBasketItems(
      (prev) =>
        prev
          .map((item) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // remove items with 0 quantity
    );
  };

  const getItemCount = (productId: string) => {
    const item = basketItems.find((i) => i.product._id === productId);
    return item ? item.quantity : 0;
  };

  const getBasketCount = () =>
    basketItems.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    basketItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  const clearBasket = useCallback(() => {
    setBasketItems([]);
  }, []);
  // ----- Render -----
  if (!hydrated) return null; // avoid hydration errors

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addItem,
        removeItem,
        getBasketCount,
        getTotalPrice,
        getItemCount,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
