import { NextResponse } from "next/server";
import { stripe } from "@/stripe";
import { urlFor } from "@/sanity/sanityImageBuilder";
import { BasketItem } from "@/lib/BaketContextProv";
export type Meta = {
  customerName: string;
  orderNumber: string; //generate order number string
  customerEmail: string;
  clerkUserId: string;
};

export async function POST(req: Request) {
  try {
    const {
      metadata,
      basketItems,
    }: { metadata: Meta; basketItems: BasketItem[] } = await req.json();

    // Check if customer exists or create one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const existingCustomer =
      customers.data.length > 0 ? customers.data[0] : null;

    // Create customer if doesn't exist
    const customer =
      existingCustomer ||
      (await stripe.customers.create({
        email: metadata.customerEmail,
        name: metadata.customerName,
        metadata: {
          clerkUserId: metadata.clerkUserId,
        },
      }));

    // Build line items
    const lineItems = basketItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.productName ?? "Unknown product",
          description: item.product.description ?? "",
          images: [
            item.product.icon
              ? urlFor(item.product.icon).width(300).height(200).url()
              : "https://placehold.co/300x200/png",
          ],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer: customer.id, // Use customer ID instead of customer_email
      line_items: lineItems,
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
