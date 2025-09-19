// components/PromoBoxes.tsx
"use client";

const PromoBoxes = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
    {[
      { title: "New here?", text: "Get your first-timer discount" },
      {
        title: "Download our app",
        text: "Exclusive discounts and the latest drops",
      },
      { title: "Worldwide delivery", text: "Fast and reliable shipping" },
      { title: "Easy returns", text: "Hassle-free returns policy" },
    ].map((box, index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white p-6 rounded-lg text-center 
        transition-transform duration-300 transform hover:-translate-y-2 hover:scale-x-105 cursor-pointer"
      >
        <h3 className="font-extrabold text-xl">{box.title}</h3>
        <p className="font-semibold text-yellow-400 text-lg">{box.text}</p>
      </div>
    ))}
  </div>
);

export default PromoBoxes;
