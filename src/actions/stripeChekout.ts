import { BasketItem } from "@/lib/BaketContextProv";
import { stripe } from "@/stripe";
import { urlFor } from "@/sanity/sanityImageBuilder";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL;

export type Meta = {
  customerName: string;
  orderNumber: string; //generate order number string
  customerEmail: string;
  clerkUserId: string;
};

// stripe server action
// the metadata gives stripe information about the order being made
export const stripeCheckOutSession = async (
  metadata: Meta,
  basketList: BasketItem[]
) => {
  //takes in metadata & allbasketItems from context

  //check if any items dont have a price
  const isWithoutPrice = basketList.filter(
    (item: BasketItem) => item.product.price === 0 //no item shall have price of 0
  );
  if (isWithoutPrice.length > 0) {
    throw new Error("some items have no price,check basket");
  }

  // check if current useremail exists on stripe
  const customers = await stripe.customers.list({
    email: metadata.customerEmail,
    limit: 1,
  });

  const existingCustomer = customers.data.length > 0 ? customers.data[0] : null;

  // ✅ If no customer, create one
  const customer =
    existingCustomer ||
    (await stripe.customers.create({
      email: metadata.customerEmail,
      metadata, // store extra info in Stripe if needed
    }));

  // ✅ Build line_items from your basket
  const lineItems = basketList.map((item: BasketItem) => ({
    price_data: {
      currency: "usd", // change if needed
      product_data: {
        name: item.product.productName ?? "Unknown product",
        description: item.product.description ?? "",
        images: [
          item.product.icon
            ? urlFor(item.product.icon).width(300).height(200).url()
            : "https://placehold.co/300x200/png",
        ],
      },
      // Stripe expects amounts in cents
      unit_amount: Math.round(item.product.price * 100),
    },
    quantity: item.quantity,
  }));

  // ✅ Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer: customer.id,
    line_items: lineItems,
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
    cancel_url: `${baseUrl}/cancel`,
    metadata: {
      // ✅ Metadata now included
      orderNumber: metadata.orderNumber,
      customerName: metadata.customerName,
      customerEmail: metadata.customerEmail,
      clerkUserId: metadata.clerkUserId,
    },
  });

  return session.url as string;
  //   return the url for the session checkout page
};
