import ProductsGrid from "@/components/ProductsGrid";
import { fetchQuery } from "@/lib/queries/fetcher";
import { ProductSearchQueryResult } from "@/sanity/types";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  const { query } = searchParams;

  const searchResults: ProductSearchQueryResult = await fetchQuery(
    "searchProdByName",
    {
      searchTerm: query,
    }
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Search Results
          </h2>
          <p className="text-lg text-gray-600">
            Results for:{" "}
            <span className="font-semibold text-blue-600">{query}</span>
          </p>
        </div>
        {/* Grid centered via container */}
        <div className="border-2 mb-4 border-black"></div>
        <ProductsGrid products={searchResults} />
      </div>
    </div>
  );
};

export default SearchPage;
