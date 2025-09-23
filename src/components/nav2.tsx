"use client";

import { useBasketContext } from "@/lib/BaketContextProv";
import { TrolleyIcon } from "@sanity/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import DropDown from "./dropDownAuth";
import { HiddenDropDown } from "./ui/hidenDropDown";
import Form from "next/form";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const { getBasketCount } = useBasketContext();
  const ref = useRef<HTMLInputElement>(null);
  ref.current?.focus();
  const [visible, setVisible] = useState(false);

  const basketCount = getBasketCount();
  //   const [showSearch, setShowSearch] = useState(false);

  const links = [
    { href: "/", label: "HOME" },
    { href: "/orders", label: "ORDERS" },
    { href: "/about", label: "ABOUT US" },
  ];
  return (
    <div className="w-full border-b border-gray-300  flex flex-col">
      <div className="flex items-cente justify-between  py-5 font-medium  ml-20 mr-20">
        <Link
          href="/"
          className="text-2xl font-bold text-[#EB8D2E] hover:opacity-70 cursor-pointer  sm:w-auto text-center sm:text-left"
        >
          letsStore
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-1"
              >
                <span className={isActive ? "text-black font-medium" : ""}>
                  {link.label}
                </span>
                <hr
                  className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </Link>
            );
          })}
        </ul>
        <div className="flex items-center gap-6">
          <div className=" block">
            <Image
              src={"/images/search.png"}
              alt="logout-icon"
              width={20}
              height={20}
              onClick={() => setVisible(!visible)}
            />
          </div>
          <Link
            href="/basket"
            className="relative flex items-center gap-1 text-gray-800 hover:text-green-600 transition font-medium"
          >
            <TrolleyIcon className="w-5 h-5" />

            <span className="absolute -top-2 -right-3 bg-[#EB8D2E] text-white text-xs px-1.5 py-0.5 rounded-full">
              {basketCount}
            </span>
          </Link>

          <div className={`${!user ? "" : "hidden sm:block"}`}>
            <DropDown />
          </div>
          <div className=" block sm:hidden">
            {user ? <HiddenDropDown /> : null}
          </div>
        </div>
      </div>
      {visible ? (
        <div className="flex justify-center w-full">
          <Form action="/search" className="w-full max-w-4xl px-4">
            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 h-10 mb-4"
              ref={ref}
            />
          </Form>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
