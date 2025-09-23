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
    <div className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Image */}
          <div className="md:w-1/2 w-full">
            {product.icon ? (
              <Image
                src={imageUrl}
                alt={product.productName}
                width={800}
                height={700}
                className="w-full h-auto object-cover border border-gray-300  shadow-md transition-transform duration-300 hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-md border border-gray-300">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:w-1/2 w-full flex flex-col gap-6">
            <h1 className="text-5xl  font-thin text-gray-900 tracking-tight leading-snug">
              {product.productName}
            </h1>
            <p className="text-3xl font-thin px-5 py-2   w-fit">
              ${product.price}
            </p>
            <div className="flex flex-col gap-2">
              <h3 className=" font-light text-gray-900 tracking-tight leading-snug">
                available sizes:
              </h3>
              <div className="flex gap-4 items-center">
                {["M", "S", "XL"].map((size) => (
                  <div
                    key={size}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-black hover:text-black transition-colors duration-200 cursor-pointer"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-1 text-sm font-semibold rounded-full shadow-sm ${
                  product.stock > 0
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              {product.stock > 0 && (
                <span className="text-sm text-gray-500">
                  {product.stock} available
                </span>
              )}
            </div>
            <div className="flex flex-col rounded-sm ">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-800 border border-gray-300 px-4 py-2  w-fit">
                Description
              </h3>

              <div className="border border-gray-300  px-4 py-4 bg-gray-50">
                <p className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-line tracking-wide">
                  {product.description}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <AddToBasketBtn product={product} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex items-center gap-2">
          <RelatedProductsSlider images={product.relatedProducts} />{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
