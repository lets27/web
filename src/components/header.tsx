"use client";

import Link from "next/link";
import Form from "next/form";
import { useEffect, useRef } from "react";
import { TrolleyIcon, PackageIcon } from "@sanity/icons";
import {
  ClerkLoaded,
  useUser,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

import { useBasketContext } from "@/lib/BaketContextProv";

const Header = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const { getBasketCount } = useBasketContext();

  const basketCount = getBasketCount();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <header className="flex flex-col sm:flex-row flex-wrap items-center px-4 py-2 gap-4">
      <Link
        href="/"
        className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer w-full sm:w-auto text-center sm:text-left"
      >
        letsStore
      </Link>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <ClerkLoaded>
          {/* clerkLoad ensures no flashes of content before the user is loaded */}
          {user ? (
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
              {/* Basket Button */}
              <Link
                href="/basket"
                className="flex items-center space-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <TrolleyIcon className="w-5 h-5" />
                <div className="flex gap-2">
                  <span className="hidden sm:inline">My Basket</span>
                  <span>({basketCount})</span>
                </div>
              </Link>

              {/* Orders Button */}
              <Link
                href="/orders"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-5 h-5" />
                <span>My Orders</span>
              </Link>

              {/* Sign Out Button */}
              <SignOutButton>
                <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black ">
                  Sign out
                </button>
              </SignOutButton>

              {/* User Info */}
              <span className="flex gap-2 items-center text-sm text-gray-700">
                <UserButton />
                <span className="hidden sm:inline">{user.fullName}</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Basket Button for non-logged in users */}

              {/* Sign In Button */}
              <SignInButton mode="modal">
                <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black w-full sm:w-auto">
                  Sign in
                </button>
              </SignInButton>
            </div>
          )}
        </ClerkLoaded>
      </div>

      <Form action="/search" className="flex-1 w-full">
        {/* expect to have a search page hence /search */}
        <input
          type="text"
          name="query"
          placeholder="Search for products"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 w-full max-w-4xl"
          ref={ref}
        />
      </Form>
    </header>
  );
};

export default Header;
