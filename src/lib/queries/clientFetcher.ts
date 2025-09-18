// lib/queries/clientFetcher.ts - For client-side components
import { client } from "@/sanity/client";
import { queries, QueryResultMap } from "@/lib/queries/queriesMap";
import { QueryParams } from "next-sanity";

export async function fetchQueryClient<K extends keyof QueryResultMap>(
  key: K,
  params: QueryParams = {} // 👈 use Sanity’s type instead of Record<string, unknown>
): Promise<QueryResultMap[K] | null> {
  const query = queries[key];

  const result = await client.fetch<QueryResultMap[K] | null>(query, params);

  return result;
}
