import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_ID;
const dataset = "production";
const apiVersion = "2025-07-09";
const token = process.env.WRITE_TOKEN_SANITY;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_ID for Sanity backend client");
}

if (!token) {
  throw new Error("Missing SANITY_READ_WRITE_TOKEN for Sanity backend client");
}

console.log("Sanity Backend Client Config:", {
  projectId: projectId ? `${projectId.substring(0, 8)}...` : "MISSING",
  dataset,
  apiVersion,
  hasToken: !!token,
  tokenPreview: token ? `${token.substring(0, 10)}...` : "MISSING",
});

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

// Test the token validity
