import {
  AllProductsQueryResult,
  ProductsByCategorySlugQueryResult,
  ProductSearchQueryResult,
} from "@/sanity/types";
import { AnimatePresence } from "framer-motion";

import Thumbnail from "./Thumbnail";
type ProductQueryResult =
  | AllProductsQueryResult
  | ProductSearchQueryResult
  | ProductsByCategorySlugQueryResult;

interface ProductsGridProps {
  products: ProductQueryResult;
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {products &&
        products.map((product) => (
          <AnimatePresence key={product._id}>
            <Thumbnail product={product} />
          </AnimatePresence>
        ))}
    </div>
  );
};

export default ProductsGrid;
