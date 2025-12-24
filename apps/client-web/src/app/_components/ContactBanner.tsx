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
    caption: "Im Ready!",
  },
];

interface ContanctBannerInfo {
  bannerText: string;
  buttons?: Array<"home" | "services" | "projects" | "about" | "contact us">;
}

interface buttonProps {
  buttonCaption: string;
  href: string;
  variant?: "primary" | "secondary";
}

const ContactButton = ({ buttonCaption, variant = "primary" }: buttonProps) => {
  const baseClasses =
    "w-full rounded-lg border-2 px-6 py-3 text-center font-semibold transition-colors sm:w-auto sm:px-8 sm:py-4";

  const variantClasses =
    variant === "primary"
      ? "border-white text-white hover:bg-white hover:text-backgroundDark"
      : "border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-backgroundDark";

  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      {buttonCaption}
    </button>
  );
};

const ContactBanner = ({ bannerText, buttons = [] }: ContanctBannerInfo) => {
  const buttonsToRender = buttonDetails.filter((button) =>
    buttons.includes(button.page as (typeof buttons)[number]),
  );

  return (
    <section className="bg-backgroundDark py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-text-dark mb-8 text-center text-lg font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          {bannerText}
        </h1>
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
