"use client";

import { urlFor } from "@/sanity/sanityImageBuilder";
import Image from "next/image";
import Link from "next/link";

import {
  Product,
  ProductSearchQueryResult,
  ProductsByCategorySlugQueryResult,
} from "@/sanity/types";

type ProductItem =
  | Product
  | ProductSearchQueryResult[number]
  | ProductsByCategorySlugQueryResult[number];

interface ThumbnailProps {
  product: ProductItem;
}

const Thumbnail = ({ product }: ThumbnailProps) => {
  const isInStock = (product.stock ?? 0) > 0;
  const imageUrl = product?.icon
    ? urlFor(product.icon)
        .height(270) // estimated height
        .width(200) // estimated width
        .quality(80)
        .auto("format")
        .url()
    : "https://placehold.co/400x600/png";

  return (
    <div className="group">
      <Link
        href={`/product/${product.slug?.current}`}
        className={`block ${!isInStock ? "opacity-60" : ""}`}
      >
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.productName || "product-image"}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 "
            height={270}
            width={200}
            priority
          />

          {!isInStock && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs tracking-wide px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        <div className="mt-3 text-center">
          <h3 className="text-base font-medium text-gray-900 line-clamp-1">
            {product.productName}
          </h3>
          <p className="text-sm font-semibold text-gray-800 mt-1">
            ${product.price?.toFixed(2) || "0.00"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;
