import Link from "next/link";

const buttonDetails = [
  {
    page: "home",
    href: "/",
    caption: "Home",
  },
  {
    page: "services",
    href: "/pages/services",
    caption: "View Services",
  },
  {
    page: "projects",
    href: "/pages/projects",
    caption: "View Projects",
  },
  {
    page: "about",
    href: "/pages/about",
    caption: "About Us",
  },
  {
    page: "contact us",
    href: "/pages/contact",
    caption: "Get In Touch",
  },
];

interface ContactBannerInfo {
  bannerText: string;
  buttons?: Array<"home" | "services" | "projects" | "about" | "contact us">;
}

interface ButtonProps {
  buttonCaption: string;
  href: string;
  variant?: "primary" | "secondary";
}

const ContactButton = ({
  buttonCaption,
  variant = "primary",
  href,
}: ButtonProps) => {
  const baseClasses =
    "w-full rounded-xl border-2 px-8 py-3.5 text-center font-semibold transition-colors sm:w-auto sm:px-10 sm:py-4";

  const variantClasses =
    variant === "primary"
      ? "border-brand-secondary bg-brand-secondary text-brand-tertiary hover:bg-brand-secondary/90 hover:cursor-pointer"
      : "border-white text-white hover:bg-white hover:text-backgroundDark hover:cursor-pointer";

  return (
    <Link href={href}>
      <button className={`${baseClasses} ${variantClasses}`}>
        {buttonCaption}
      </button>
    </Link>
  );
};

const ContactBanner = ({ bannerText, buttons = [] }: ContactBannerInfo) => {
  const buttonsToRender = buttonDetails.filter((button) =>
    buttons.includes(button.page as (typeof buttons)[number]),
  );

  return (
    <section className="bg-backgroundDark py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-text-dark mb-8 text-center text-xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          {bannerText}
        </h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          {buttonsToRender.map((button, index) => (
            <ContactButton
              key={button.page}
              buttonCaption={button.caption}
              href={button.href}
              variant={index === 0 ? "primary" : "secondary"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
