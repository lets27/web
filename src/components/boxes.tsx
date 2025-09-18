// components/PromoBoxes.tsx
"use client";

// components/PromoBoxes.tsx
"use client";

const PromoBoxes = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
    <div
      className="bg-gradient-to-r from-red-400 to-red-700 text-white p-6 rounded-lg text-center 
      transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
    >
      <h3 className="font-extrabold text-xl">New here?</h3>
      <p className="font-semibold text-lg">Get your first-timer discount</p>
    </div>
    <div
      className="bg-gradient-to-r from-green-400 to-green-700 text-white p-6 rounded-lg text-center 
      transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
    >
      <h3 className="font-extrabold text-xl">Download our app</h3>
      <p className="font-semibold text-lg">
        Exclusive discounts and the latest drops
      </p>
    </div>
    <div
      className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg text-center 
      transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
    >
      <h3 className="font-extrabold text-xl">Worldwide delivery</h3>
      <p className="font-semibold text-lg">Fast and reliable shipping</p>
    </div>
    <div
      className="bg-gradient-to-r from-blue-400 to-blue-700 text-white p-6 rounded-lg text-center 
      transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
    >
      <h3 className="font-extrabold text-xl">Easy returns</h3>
      <p className="font-semibold text-lg">Hassle-free returns policy</p>
    </div>
  </div>
);

export default PromoBoxes;
