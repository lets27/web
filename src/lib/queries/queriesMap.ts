import {
  AllProductsQueryResult,
  AllSalesQueryResult,
  CategoriesQueryResult,
  ProductBySlugQueryResult,
  ProductsByCategorySlugQueryResult,
  ProductSearchQueryResult,
  UserOrdersQueryResult,
} from "@/sanity/types";
import {
  allProductsQuery,
  categoriesQuery,
  productBySlugQuery,
  productsByCategorySlugQuery,
  productSearchQuery,
  userOrdersQuery,
  allSalesQuery,
} from "./queries";

// lib/queries/queriesMap.ts
export const queries = {
  allProducts: allProductsQuery,
  categories: categoriesQuery,
  productBySlug: productBySlugQuery,
  searchProdByName: productSearchQuery,
  searchByCategory: productsByCategorySlugQuery,
  userOrders: userOrdersQuery,
  allSales: allSalesQuery,
} as const;

// Map query keys to their return types
export type QueryResultMap = {
  allProducts: AllProductsQueryResult;
  categories: CategoriesQueryResult;
  productBySlug: ProductBySlugQueryResult;
  searchProdByName: ProductSearchQueryResult;
  searchByCategory: ProductsByCategorySlugQueryResult;
  userOrders: UserOrdersQueryResult;
  allSales: AllSalesQueryResult; // Replace 'any' with the actual type if available
};
