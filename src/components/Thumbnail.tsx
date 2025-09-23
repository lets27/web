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
        <div className="bg-white rounded-md shadow hover:shadow-md transition-shadow duration-300">
          {/* Image wrapper */}
          <div className="relative w-full h-72 overflow-hidden rounded-t-md bg-white flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={product.productName || "product-image"}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              fill
              priority
            />

            {!isInStock && (
              <span className="absolute top-2 left-2 bg-black text-white text-xs tracking-wide px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>

          {/* Product info */}
          <div className="px-2 py-3 text-center">
            <h3 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition-colors duration-200">
              {product.productName}
            </h3>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              ${product.price?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;
