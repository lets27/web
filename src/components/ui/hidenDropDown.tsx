import Link from "next/link"; // Add this import

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export function HiddenDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={"/images/hidden-menu.png"}
          alt="logout-icon"
          width={20}
          height={20}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/home" className="flex justify-between w-full">
              <span>Home</span>
              <DropdownMenuShortcut>
                {" "}
                <Image
                  src={"/images/home.png"}
                  alt="logout-icon"
                  width={15}
                  height={15}
                />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/orders"
              className="flex items-center justify-between w-full"
            >
              <span>Orders</span>
              <DropdownMenuShortcut>
                {" "}
                <Image
                  src={"/images/orders.png"}
                  alt="logout-icon"
                  width={15}
                  height={15}
                />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuSeparator />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem asChild>
            <Link href="/contact" className="flex justify-between w-full">
              <span>About Us</span>
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <SignOutButton>
            <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-black">
              <span>Sign out</span>
              <Image
                src={"/images/logout-black.png"}
                alt="logout-icon"
                width={20}
                height={20}
              />
            </button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
