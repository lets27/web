import Image from "next/image";
import { urlFor } from "@/sanity/sanityImageBuilder";

interface RelatedProductsSliderProps {
  images?: {
    _key: string;
    asset: {
      _id: string;
      url: string | null;
    } | null;
  }[];
}

const RelatedProductsSlider = ({ images }: RelatedProductsSliderProps) => {
  if (!images?.length) return null;

  return (
    <div className="mt-12 w-full">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>

      {/* Desktop = horizontal scroll | Mobile = wrap */}
      <div className="flex flex-wrap gap-4 md:flex-nowrap md:overflow-x-auto pb-4">
        {images.map((img, idx) => {
          const imageUrl = img?.asset
            ? urlFor(img)
                .height(250)
                .width(200)
                .quality(90)
                .auto("format")
                .url()
            : "https://placehold.co/200x250/png";

          return (
            <div
              key={img._key || idx}
              className="flex-shrink-0 w-40 sm:w-48 h-60 rounded-lg overflow-hidden shadow-md 
                         transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
            >
              <Image
                src={imageUrl}
                alt={"related"}
                width={200}
                height={350}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProductsSlider;
