import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/client";

const readToken = process.env.READ_TOKEN;

// Only check token when actually needed (not during build)
if (typeof window === "undefined" && !readToken) {
  throw new Error("missing READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken, //only read tokens passed here
  browserToken: readToken, //only read tokens passed here
  fetchOptions: {
    revalidate: 0,
  },
});
