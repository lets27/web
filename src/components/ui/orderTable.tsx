"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BasketBtns from "@/components/ui/BasketBtns";
import Image from "next/image";
import { urlFor } from "@/sanity/sanityImageBuilder";
import { ProductWithPrice } from "@/lib/BaketContextProv";

export interface BasketItem {
  product: ProductWithPrice;
  quantity: number;
}

type BasketTableProps = {
  basketItems: BasketItem[];
  totalPrice: number;
};

export default function BasketTable({
  basketItems,
  totalPrice,
}: BasketTableProps) {
  return (
    <Table className="w-full border border-gray-300 text-sm font-poppins">
      <TableCaption className="text-gray-500 italic mb-4">
        Your basket summary.
      </TableCaption>

      <TableHeader className="bg-gray-100 border-b border-gray-300">
        <TableRow>
          <TableHead className="hidden md:table-cell w-[80px] text-gray-700 uppercase tracking-wide border-r border-gray-200">
            Image
          </TableHead>
          <TableHead className="text-gray-700 uppercase tracking-wide border-r border-gray-200">
            Product
          </TableHead>
          <TableHead className="text-gray-700 uppercase tracking-wide border-r border-gray-200">
            Quantity
          </TableHead>
          <TableHead className="text-gray-700 uppercase tracking-wide border-r border-gray-200">
            Price
          </TableHead>
          <TableHead className="hidden md:table-cell text-right text-gray-700 uppercase tracking-wide">
            Subtotal
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {basketItems.map((item) => {
          const product = item.product;
          const imageUrl = product?.icon
            ? urlFor(product.icon)
                .height(50)
                .width(50)
                .quality(80)
                .auto("format")
                .url()
            : "https://placehold.co/50x50/png";

          return (
            <TableRow
              key={product._id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="hidden md:table-cell border-r border-gray-100">
                <Image
                  src={imageUrl}
                  alt={product.productName}
                  width={50}
                  height={50}
                  className="rounded-full object-cover border border-gray-300"
                />
              </TableCell>

              <TableCell className="font-medium text-gray-800 border-r border-gray-100">
                {product.productName}
              </TableCell>

              <TableCell className="border-r border-gray-100">
                <BasketBtns product={product} />
              </TableCell>

              <TableCell className="text-gray-700 border-r border-gray-100">
                ${product.price?.toFixed(2)}
              </TableCell>

              <TableCell className="hidden md:table-cell text-right text-gray-900 font-medium">
                ${(product.price * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>

      <TableFooter className="bg-gray-100 border-t border-gray-300">
        <TableRow>
          <TableCell colSpan={4} className="hidden md:table-cell text-gray-700">
            Total
          </TableCell>
          <TableCell className="text-left md:text-right font-semibold text-gray-900">
            ${totalPrice.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
