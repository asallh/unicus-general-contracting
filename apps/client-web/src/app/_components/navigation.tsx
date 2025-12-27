"use client";

import Link from "next/link";
import Image from "next/image";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React, { useState } from "react";

export default function MainNavigation(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <NavigationMenu.Root className="bg-brand-secondary text-brand-textColorMain flex w-full items-center justify-between p-3 px-4 sm:p-4 sm:px-6 md:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src="/full_primary/full_primary.png"
            alt="Unicus General Contracting Logo"
            width={210}
            height={90}
            className="h-auto w-32 sm:w-40 md:w-[210px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu.List className="hidden flex-row items-center justify-center gap-4 md:flex lg:gap-6">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-base transition-colors duration-200 lg:text-lg">
              <NavigationMenu.Link>
                <Link href="/">Home</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-base transition-colors duration-200 lg:text-lg">
              <NavigationMenu.Link asChild>
                <Link href="/pages/about">About</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-base transition-colors duration-200 lg:text-lg">
              <NavigationMenu.Link>
                <Link href="/pages/services">Services</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-base transition-colors duration-200 lg:text-lg">
              <NavigationMenu.Link>
                <Link href="/pages/projects">Our Work</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-accent border-brand-primary text-brand-primary hover:bg-brand-primary border-2 p-2 text-base transition-colors duration-200 lg:text-lg rounded-xl">
              <NavigationMenu.Link>
                <Link href="/pages/contact">Contact Us</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        {/* Mobile Menu Button */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </NavigationMenu.Root>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-brand-secondary border-brand-textColorMain/20 w-full border-t md:hidden">
          <nav className="flex flex-col py-4">
            <Link
              href="/"
              className="hover:bg-brand-primary/10 hover:text-brand-primary px-6 py-3 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/pages/about"
              className="hover:bg-brand-primary/10 hover:text-brand-primary px-6 py-3 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/pages/services"
              className="hover:bg-brand-primary/10 hover:text-brand-primary px-6 py-3 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pages/projects"
              className="hover:bg-brand-primary/10 hover:text-brand-primary px-6 py-3 text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Work
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
