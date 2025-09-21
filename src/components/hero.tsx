// components/HeroSection.tsx
"use client";

import Image from "next/image";

const HeroSection = () => (
  <div className="relative w-full h-[80vh] bg-gradient-to-r from-[#1a202c] via-[#2d3748] to-[#4a5568]">
    {/* Hero Image */}
    <Image
      src="/images/niki.webp"
      alt="Hero Section"
      layout="fill"
      objectFit="cover"
      className="opacity-50"
      priority
    />

    {/* Overlay Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
      <h1 className="text-4xl md:text-5xl font-semibold mb-4">
        Discover Our Latest Collection
      </h1>
      <p className="text-lg mb-6">Trendy apparel to elevate your style.</p>
      <span className="px-8 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition duration-300">
        Shop Now
      </span>
    </div>
  </div>
);

export default HeroSection;
