"use client";
import Image from "next/image";

function TestimonialsPage() {
  const testimonials = [
    {
      name: "Thabo M.",
      quote:
        "This platform transformed how I showcase my products. The design is sleek and intuitive!",
      image: "/images/leader.png",
    },
    {
      name: "Naledi K.",
      quote:
        "I love how easy it is to manage my store. The team really understands user experience.",
      image: "/images/chick-black.png",
    },
    {
      name: "Kabelo R.",
      quote:
        "Support was fast and helpful. I felt like I had a partner in building my brand.",
      image: "/images/dude.png",
    },
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-[#EB8D2E] text-center mb-12">
        What Our Clients Say
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {testimonials.map((person, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <Image
              src={person.image}
              alt={person.name}
              width={150}
              height={150}
              className="rounded-full object-cover mb-4"
              priority
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {person.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{person.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsPage;
