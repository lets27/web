import CategoryFilter from "@/components/CategoryFilter";
import ProductsGrid from "@/components/ProductsGrid";
import { fetchQuery } from "@/lib/queries/fetcher";

interface CategoriesSearchedProps {
  params: { slug: string }; // ⚠️ same fix
}

const CategoriesSearched = async ({ params }: CategoriesSearchedProps) => {
  const { slug } = await params;
  const categoryProducts = await fetchQuery("searchByCategory", { slug: slug });
  console.log("cats:", categoryProducts);
  const categories = await fetchQuery("categories");
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Search results for: {(await params).slug}
        </h2>

        <CategoryFilter categories={categories} />
        <div className="border-2 mb-4 border-black"></div>
        {/* ProductsGrid centered by container */}
        <ProductsGrid products={categoryProducts} />
      </div>
    </div>
  );
};

export default CategoriesSearched;
