import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/pages/about", label: "About Us" },
  { href: "/pages/services", label: "Services" },
  { href: "/pages/projects", label: "Our Work" },
  { href: "/pages/contact", label: "Contact" },
];

export default function GlobalFooter() {
  return (
    <footer className="bg-brand-secondary">
      <div className="container mx-auto px-4 py-10 sm:px-6 md:px-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/secondary logo/secondary logo-23.png"
              alt="Unicus Secondary Logo"
              height={220}
              width={220}
              className="mb-4 h-auto w-28 sm:w-36"
            />
            <p className="text-brand-tertiary text-sm leading-relaxed sm:text-base">
              Building unique commercial spaces across Alberta since 2020.
              Quality, craftsmanship, and reliability — every project.
            </p>
            <p className="text-brand-primary mt-3 text-sm font-semibold sm:text-base">
              Proudly Serving <span className="font-bold">Alberta</span> since{" "}
              <span className="font-bold">2020</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-brand-tertiary mb-4 text-sm font-bold uppercase tracking-wider sm:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-tertiary hover:text-brand-primary text-sm transition-colors sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-brand-tertiary mb-4 text-sm font-bold uppercase tracking-wider sm:text-base">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FaPhone className="text-brand-primary shrink-0" />
                <a
                  href="tel:4036072471"
                  className="text-brand-tertiary hover:text-brand-primary text-sm font-semibold transition-colors sm:text-base"
                >
                  (403) 607-2471
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-brand-primary mt-0.5 shrink-0" />
                <a
                  href="mailto:unicuscontracting@gmail.com"
                  className="text-brand-tertiary hover:text-brand-primary break-all text-sm font-semibold transition-colors sm:text-base"
                >
                  unicuscontracting@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-brand-primary shrink-0" />
                <span className="text-brand-tertiary text-sm sm:text-base">
                  Calgary, Alberta, Canada
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-brand-tertiary/20 border-t px-4 py-5 sm:px-6 md:px-12">
        <p className="text-brand-tertiary text-xs leading-relaxed sm:text-sm">
          We acknowledge that our work takes place on the traditional territories
          of Indigenous Peoples across Alberta, including Treaty 7 in Calgary
          and the Métis Nation of Alberta.
        </p>
        <p className="text-brand-tertiary mt-2 text-xs sm:text-sm">
          © Unicus General Contracting 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
