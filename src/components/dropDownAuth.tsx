"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const navLinks = [{ href: "/", label: "Home" }];

const DropDown = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={"/images/profile_icon.png"}
          width={20}
          height={20}
          alt="menu"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[200px] z-50"
        align="end" // aligns menu to the right edge of trigger
        sideOffset={8} // adds spacing from the trigger
      >
        {navLinks.map((item) => (
          <DropdownMenuItem asChild key={item.href}>
            <Link href={item.href} className="flex items-center gap-2">
              {item.label}{" "}
              <Image
                src={"/images/home.png"}
                alt="logout-icon"
                width={15}
                height={15}
              />
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          {user ? (
            <SignOutButton>
              <button className=" flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-black ">
                <span>Sign out</span>
                <Image
                  src={"/images/logout-black.png"}
                  alt="logout-icon"
                  width={20}
                  height={20}
                />
              </button>
            </SignOutButton>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center bg-gray-900 text-white px-4 py-2 rounded hover:bg-black w-full sm:w-auto">
                <span>Sign in</span>
                <Image
                  src={"/images/login.png"}
                  alt="logout-icon"
                  width={20}
                  height={20}
                />
              </button>
            </SignInButton>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
