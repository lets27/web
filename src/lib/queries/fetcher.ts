// lib/sanity/fetcher.ts
import { sanityFetch } from "@/sanity/live";
import { queries, QueryResultMap } from "@/lib/queries/queriesMap";

export async function fetchQuery<K extends keyof QueryResultMap>(
  key: K,
  params?: Record<string, unknown>
): Promise<QueryResultMap[K]> {
  const query = queries[key];

  const result = await sanityFetch({
    query,
    params,
  });

  // If null, return empty array for array results, or null for single result
  return (result.data ??
    (Array.isArray(result.data) ? [] : null)) as QueryResultMap[K];
}
