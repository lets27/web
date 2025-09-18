import Stripe from "stripe";

// Read Stripe secret key from environment variables (server-only)
const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}

export const stripe = new Stripe(stripeSecret, {
  // Use account default API version; configure in Stripe Dashboard if needed
});
