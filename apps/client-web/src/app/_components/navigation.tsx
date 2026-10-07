"use client";

import Link from "next/link";
import Image from "next/image";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pages/about", label: "About" },
  { href: "/pages/services", label: "Services" },
  { href: "/pages/projects", label: "Our Work" },
];

export default function MainNavigation(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-none"
      }`}
    >
      <NavigationMenu.Root className="bg-brand-secondary text-brand-textColorMain flex w-full items-center justify-between px-4 py-3 sm:px-6 md:px-12">
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
        <NavigationMenu.List className="hidden items-center gap-1 md:flex lg:gap-2">
          {navLinks.map((link) => (
            <NavigationMenu.Item key={link.href}>
              <NavigationMenu.Link asChild>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-base font-medium transition-colors duration-200 lg:text-lg ${
                    pathname === link.href
                      ? "text-brand-primary font-semibold"
                      : "hover:text-brand-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link
                href="/pages/contact"
                className={`border-brand-primary ml-2 rounded-xl border-2 px-4 py-2 text-base font-semibold transition-colors duration-200 lg:text-lg ${
                  pathname === "/pages/contact"
                    ? "bg-brand-primary text-white"
                    : "text-brand-primary hover:bg-brand-primary hover:text-white"
                }`}
              >
                Contact Us
              </Link>
            </NavigationMenu.Link>
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
      <div
        className={`bg-brand-secondary border-brand-textColorMain/10 overflow-hidden border-t transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-6 py-3 text-base transition-colors ${
                pathname === link.href
                  ? "text-brand-primary bg-brand-primary/10 font-semibold"
                  : "hover:bg-brand-primary/10 hover:text-brand-primary"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-3">
            <Link
              href="/pages/contact"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary block rounded-xl border-2 px-4 py-2.5 text-center text-base font-semibold transition-colors hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
