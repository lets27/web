import { createClient } from "next-sanity";

const readToken = process.env.READ_TOKEN;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: true,
  token: readToken, // Use read token for frontend data fetching
  stega: {
    studioUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/studio"
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/studio`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
});
