import ProductsGrid from "./ProductsGrid";
import CategoryFilter from "./CategoryFilter";
import { fetchQuery } from "@/lib/queries/fetcher";
import HeroSection from "./hero";

const ProductView = async () => {
  const products = await fetchQuery("allProducts");
  const categories = await fetchQuery("categories");
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter categories={categories} />

        {/* Centered New Arrivals */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          latest Arrivals
        </h2>
        <div className="border-2 mb-4 border-black"></div>

        <ProductsGrid products={products} />
      </div>
    </div>
  );
};

export default ProductView;
