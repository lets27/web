import { redirect } from "next/navigation";
// your server-side fetch helper
import { Order as SanityOrder, UserOrdersQueryResult } from "@/sanity/types";

import { fetchQuery } from "@/lib/queries/fetcher";

import { auth, currentUser } from "@clerk/nextjs/server";

// extend Order with defaults for optional fields
export type OrderWithDefaults = Omit<SanityOrder, "orderNumber"> & {
  orderNumber: string;
  orderDate: string;
  status: string;
  currency: string;
  totalPrice: number;
  amountDiscount: number;
  stripePaymentId: string;
};

async function OrdersPage() {
  const session = await auth();
  const userId = session?.userId;
  const user = await currentUser();

  if (!userId || !user) redirect("/"); // redirect if not logged in

  // Optionally, fetch user email from Clerk if you need email
  // You can use Clerk's users API server-side if you want email

  // For example, assuming you have email from somewhere:
  const email = user.emailAddresses?.[0]?.emailAddress;
  console.log("orders bro:", userId);
  // fetch orders for user
  const userOrdersRaw: UserOrdersQueryResult = await fetchQuery("userOrders", {
    email,
  });

  // Normalize nulls to default values
  const orders: OrderWithDefaults[] = (userOrdersRaw || []).map((o) => ({
    _id: o._id,
    _type: "order",
    _createdAt: o._createdAt ?? new Date().toISOString(),
    _updatedAt: o._updatedAt ?? new Date().toISOString(),
    _rev: o._rev ?? "",
    orderNumber: o.orderNumber ?? "UNKNOWN",
    orderDate: o.orderDate ?? new Date().toISOString(),
    status: o.status ?? "pending", // choose a valid default
    currency: o.currency ?? "USD",
    totalPrice: o.totalPrice ?? 0,
    amountDiscount: o.amountDiscount ?? 0,
    stripePaymentId: o.stripePaymentId ?? "N/A",
    stripeCheckoutSessionId: o.stripeCheckoutSessionId ?? "",
    stripeCustomerId: o.stripeCustomerId ?? "",
    customerEmail: o.customerEmail ?? "",
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">No orders found</p>
          <p className="text-sm">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Order header with number, date, status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order {order.orderNumber.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {order.currency.toUpperCase()} {order.totalPrice.toFixed(2)}
                  </p>
                  {/* Status badge */}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Order ID:</p>
                  <p className="font-mono text-xs">{order.orderNumber}</p>
                </div>

                <div>
                  <p className="text-gray-600">Payment ID:</p>
                  <p className="font-mono text-xs">{order.stripePaymentId}</p>
                </div>

                {order.amountDiscount > 0 && (
                  <div>
                    <p className="text-gray-600">Discount:</p>
                    <p className="text-green-600">
                      -{order.currency.toUpperCase()}
                      {order.amountDiscount.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
