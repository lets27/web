import { backendClient } from "@/lib/backendClient";
import { stripe } from "@/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export type Meta = {
  customerName: string;
  orderNumber: string; //generate order number string
  customerEmail: string;
  clerkUserId: string;
};

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  console.log("stripe-secrete:", webhookSecret);

  if (!webhookSecret) {
    throw new Error("no webhook secrete found");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      webhookSecret
    );
  } catch (error) {
    throw new Error(`webhook error ${error}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Processing checkout session:", session.id);
      console.log("Session metadata:", session.metadata);
      console.log("Session status:", session.payment_status);
      console.log("Session mode:", session.mode);

      // Stripe session is working fine - the issue is with Sanity

      const order = await createOrderInSanity(session);
      console.log(`order created in sanity:`, order);
    }
  } catch (error) {
    console.error("Detailed error:", error);
    throw new Error(`order webhook creation failed:${error}`);
  }
  return NextResponse.json({ recieved: true });
}

const createOrderInSanity = async (session: Stripe.Checkout.Session) => {
  // Destructure fields from the Stripe session
  const {
    id: stripeCheckoutSessionId,
    customer, // string | Stripe.Customer | null
    customer_email,
    customer_details,
    payment_intent,
    currency,
    total_details,
    amount_total,
    payment_status,
    metadata,
  } = session;

  const orderNumber = (metadata as Record<string, string> | null)?.orderNumber;

  // Prepare values
  const stripeCustomerId =
    typeof customer === "string"
      ? customer
      : (customer as Stripe.Customer | null)?.id || "";
  const customerEmail = customer_details?.email || customer_email || "";
  const stripePaymentId =
    typeof payment_intent === "string"
      ? payment_intent
      : (payment_intent as Stripe.PaymentIntent | null)?.id || "";
  const currencyCode = currency || "usd";
  const amountDiscount = (total_details?.amount_discount ?? 0) / 100;
  const totalPrice = (amount_total ?? 0) / 100;
  const status = payment_status === "paid" ? "paid" : "pending";
  const orderDate = new Date().toISOString();

  if (!orderNumber) {
    throw new Error("Missing orderNumber in session metadata");
  }

  // Debug: Log the order data before creating
  console.log("Creating order with data:", {
    orderNumber,
    stripeCheckoutSessionId,
    stripeCustomerId,
    customerEmail,
    stripePaymentId,
    currencyCode,
    amountDiscount,
    totalPrice,
    status,
    orderDate,
  });

  // Test Sanity connection before creating

  // Create order document in Sanity
  console.log("Creating order in Sanity...");
  const orderDoc = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId,
    stripeCustomerId,
    customerEmail,
    stripePaymentId,
    currency: currencyCode,
    amountDiscount,
    totalPrice,
    status,
    orderDate,
  });

  return orderDoc;
};
