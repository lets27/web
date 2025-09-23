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
      <div className="flex items-center justify-center mb-10 gap-4">
        <div className="flex-grow border-t-2 border-black border-solid mt-2"></div>
        <h2 className="text-3xl font-thin  tracking-wide uppercase text-gray-900 whitespace-nowrap">
          Related Products
        </h2>
        <div className="flex-grow border-t-2 border-black border-solid mt-2"></div>
      </div>

      {/* Desktop = horizontal scroll | Mobile = wrap */}
      <div className="flex flex-wrap gap-6 md:flex-nowrap md:overflow-x-auto pb-4">
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
              className="flex-shrink-0 w-40 sm:w-48 h-60 rounded-xl overflow-hidden shadow-md 
                       transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
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
