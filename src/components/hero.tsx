// components/HeroSection.tsx
"use client";

import Image from "next/image";

const HeroSection = () => (
  <div className="w-full h-96 relative mb-12">
    {/* Hero Image */}
    <Image
      src="/images/niki.webp"
      alt="Hero Section"
      fill
      className="object-cover"
      priority
    />

    {/* Overlay Text */}
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-white text-4xl md:text-5xl font-bold bg-black bg-opacity-40 px-6 py-4 rounded">
        Our Latest Collection
      </h1>
    </div>
  </div>
);

export default HeroSection;
