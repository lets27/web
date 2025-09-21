import AddToBasketBtn from "@/components/AddToBasketBtn";
import { fetchQuery } from "@/lib/queries/fetcher";
import { urlFor } from "@/sanity/sanityImageBuilder";
import Image from "next/image";
import { ProductWithPrice } from "@/lib/BaketContextProv";
import RelatedProductsSlider from "@/components/slider";

interface ProductDetailsProps {
  params: { slug: string };
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  // fetch the product as ProductWithPrice directly
  const productData = await fetchQuery("productBySlug", {
    slug: (await params).slug,
  });

  if (!productData) {
    throw new Error("Product not found"); // or redirect("/404")
  }

  const product: ProductWithPrice = productData as ProductWithPrice;

  // use urlFor only if icon exists, otherwise fallback
  const imageUrl = product.icon
    ? urlFor(product.icon)
        .height(400)
        .width(300)
        .quality(90)
        .auto("format")
        .url()
    : "https://placehold.co/300x200/png";

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-4 mt-20">
      <div className="max-w-7xl w-full flex flex-col gap-12">
        {/* Main product section */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image */}
          <div className="flex-1">
            {product.icon ? (
              <Image
                src={imageUrl}
                alt={product.productName}
                width={800}
                height={700}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                priority
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-start gap-6">
            <h1 className="text-5xl font-semibold text-gray-900 leading-tight">
              {product.productName}
            </h1>
            <p className="text-3xl font-bold text-blue-600">${product.price}</p>
            <span
              className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
            {product.stock > 0 && (
              <span className="text-sm text-gray-600">
                {product.stock} available
              </span>
            )}
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>
            <AddToBasketBtn product={product} />
          </div>
        </div>

        {/* Related Products below main content */}
        <RelatedProductsSlider images={product.relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
