import {
  AllProductsQueryResult,
  ProductsByCategorySlugQueryResult,
  ProductSearchQueryResult,
} from "@/sanity/types";
import { AnimatePresence } from "framer-motion";

import Thumbnail from "./Thumbnail";
import TestimonialsPage from "./ui/testimonials";
type ProductQueryResult =
  | AllProductsQueryResult
  | ProductSearchQueryResult
  | ProductsByCategorySlugQueryResult;

interface ProductsGridProps {
  products: ProductQueryResult;
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className=" flex flex-col gap-6 flex-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products &&
          products.map((product) => (
            <AnimatePresence key={product._id}>
              <Thumbnail product={product} />
            </AnimatePresence>
          ))}
      </div>
      <TestimonialsPage />
    </div>
  );
};

export default ProductsGrid;
