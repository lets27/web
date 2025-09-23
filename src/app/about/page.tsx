"use client";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

import Image from "next/image";

export default function AboutPage() {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_OWNER_NUMBER;
    if (!phoneNumber) {
      console.error("Owner's WhatsApp number is not set!");
      return;
    }

    const message = `Hi there 👋 I came across your store and just wanted to reach out as  i have some enquiries   
    `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };
  return (
  <div className="space-y-28 px-4 max-w-[1140px] mx-auto">
    {/* Section 1: Meet Our Team */}
    <div className="flex flex-col md:flex-row items-center mt-20">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-[52px] font-bold text-[#EB8D2E]">
          Meet Our Team
        </h1>
        <p className="mt-5 mb-5 tracking-wide leading-6 text-justify">
          From trend scouts to textile experts, our team is passionate about curating timeless pieces that elevate your wardrobe. Every stitch, every silhouette is crafted with you in mind.
        </p>
        <button className="px-4 py-3 bg-[#EB8D2E] text-black rounded cursor-pointer hover:opacity-80 transition">
          Learn More
        </button>
      </div>
      <div className="md:w-1/2 flex justify-start items-center">
        <Image
          src="/images/dude3.png"
          alt="About Us"
          className="w-[350px] h-[350px] object-cover rounded-full"
          width={350}
          height={350}
        />
      </div>
    </div>

    {/* Section 2: Our Vision */}
    <div className="flex flex-col md:flex-row-reverse items-center">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-[52px] font-bold text-[#EB8D2E]">Our Vision</h1>
        <p className="mt-5 mb-5 tracking-wide leading-6 text-justify">
          We envision a world where fashion is effortless, expressive, and accessible. Our collections blend comfort with confidence, helping you look great and feel even better—every single day.
        </p>
        <button className="px-4 py-3 bg-[#EB8D2E] text-black rounded cursor-pointer hover:opacity-80 transition">
          Discover More
        </button>
      </div>
      <div className="md:w-1/2 flex justify-start items-center">
        <Image
          src="/images/dude2.png"
          alt="Our Vision"
          className="w-[350px] h-[350px] object-cover rounded-full"
          width={350}
          height={350}
        />
      </div>
    </div>

    {/* Section 3: Contact Us */}
    <div className="text-center py-10">
      <h2 className="text-4xl font-bold text-[#EB8D2E] mb-6">Get in Touch</h2>
      <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
        Have questions about sizing, shipping, or styling tips? Our team is here to help. Reach out via WhatsApp or email and let’s make fashion personal.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button
            onClick={handleWhatsAppRedirect}
            className="bg-[#25D366] text-white hover:bg-[#1ebe5d] flex items-center gap-2 px-6 py-3 rounded-full transition"
          >
            <FaWhatsapp size={20} />
            WhatsApp
          </Button>

          <Button
            onClick={() => {
              // Email redirect logic goes here
            }}
            className="bg-[#EB8D2E] text-black hover:opacity-80 px-6 py-3 rounded-full transition"
          >
            Contact via Email
          </Button>
        </div>
      </div>
    </div>

    {/* Section 4: Subscribe */}
    <div className="bg-[#FFF8F0] py-16 px-4 mt-10 rounded-xl shadow-md text-center mb-4">
      <h2 className="text-4xl font-bold text-[#EB8D2E] mb-4">
        Stay in the Loop
      </h2>
      <p className="text-gray-700 mb-8 max-w-xl mx-auto">
        Be the first to know about new drops, exclusive discounts, and style inspiration. Join our fashion-forward community today.
      </p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#EB8D2E]"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#EB8D2E] text-black font-medium rounded-full hover:opacity-80 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
);}
