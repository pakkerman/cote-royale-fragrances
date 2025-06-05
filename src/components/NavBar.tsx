"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiBars3,
  HiMagnifyingGlass,
  HiShoppingBag,
  HiUser,
  HiXMark,
} from "react-icons/hi2";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type NavIconsProps = {
  className?: string;
  tabIndex?: number;
};

function NavIcons({ className = "", tabIndex: tabIndex }: NavIconsProps) {
  return (
    <div className={clsx("flex items-center gap-8", className)}>
      <Link
        href="#"
        className="text-white"
        aria-label="search"
        tabIndex={tabIndex}
      >
        <HiMagnifyingGlass size={24} />
      </Link>
      <Link
        href="#"
        className="text-white"
        aria-label="search"
        tabIndex={tabIndex}
      >
        <HiUser size={24} />
      </Link>
      <Link
        href="#"
        className="text-white"
        aria-label="search"
        tabIndex={tabIndex}
      >
        <HiShoppingBag size={24} />
      </Link>
    </div>
  );
}

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <header className="">
      <div className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          <button
            onClick={toggleDrawer}
            aria-label="Menu"
            className="cursor-pointer p-2 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <HiBars3 size={24} />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="cote royale paris"
                width={100}
                height={30}
                className="w-32 cursor-pointer md:w-44"
              />
            </Link>
          </div>
          <div className="flex">
            <NavIcons className="hidden md:flex" />
          </div>
        </div>
      </div>

      <div
        aria-hidden={true}
        onClick={toggleDrawer}
        className={clsx(
          "nav-drawer-blur fixed inset-0 z-40 bg-black/40 opacity-0 transition-all duration-500",
          isDrawerOpen
            ? "pointer-events-auto opacity-100 backdrop-blur-xs"
            : "pointer-events-none backdrop-blue-none",
        )}
      />
      <div
        role="dialog"
        aria-modal={isDrawerOpen}
        className={clsx(
          "nav-drawer fixed top-0 left-0 z-50 h-full w-72 bg-neutral-900 p-6 transition-transform duration-500",
          isDrawerOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex justify-end ">
          <button
            aria-label="close menu"
            onClick={toggleDrawer}
            tabIndex={isDrawerOpen ? 0 : -1}
            className="p-2 text-white transition-colors duration-300 hover:bg-white/10"
          >
            <HiXMark size={24} />
          </button>
        </div>

        <nav aria-label="main navigation" className="space-y-4 flex flex-col">
          {settings.data.navigation_link.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              onClick={() => setIsDrawerOpen(false)}
              tabIndex={isDrawerOpen ? 0 : -1}
              className="block border-b border-white/10 py-2 text-xl font-semibold tracking-wide text-white uppercase hover:text-gray-300"
            />
          ))}
          <div className="pt-4 md:hidden">
            <NavIcons
              className="justify-around"
              tabIndex={isDrawerOpen ? 0 : -1}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
