import { fetchQuery } from "@/lib/queries/fetcher";
import ProductView from "@/components/productView";
import { AllProductsQueryResult } from "@/sanity/types";

export default async function Home() {
  // const products = await fetchQuery("allProducts");
  const products: AllProductsQueryResult = await fetchQuery("allProducts");
  console.log("products:", products);

  return (
    <div className="">
      <ProductView />
    </div>
  );
}
