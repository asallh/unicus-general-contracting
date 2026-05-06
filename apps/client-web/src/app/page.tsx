import { HydrateClient } from "~/trpc/server";
import Image from "next/image";
import Link from "next/link";
import ContactBanner from "./_components/ContactBanner";
import { FeaturedProjects } from "./_components/FeaturedProjects";
import { FaHandshake, FaCheckCircle, FaClock, FaStar } from "react-icons/fa";

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "100+", label: "Projects Completed" },
  { value: "100%", label: "Quality Guaranteed" },
  { value: "5★", label: "Client Satisfaction" },
];

const coreValues = [
  {
    icon: <FaHandshake className="text-brand-primary text-3xl" />,
    title: "Concept to Creation",
    description:
      "Whether or not you have a design plan, we ensure you feel supported as we collaborate and turn your vision into reality.",
  },
  {
    icon: <FaCheckCircle className="text-brand-primary text-3xl" />,
    title: "Reliable Construction",
    description:
      "We pride ourselves on bringing reliable construction to our clients 100% of the time.",
  },
  {
    icon: <FaClock className="text-brand-primary text-3xl" />,
    title: "Efficiency & Consistency",
    description:
      "Our team has mastered a signature process for planning the most efficient and consistent builds.",
  },
  {
    icon: <FaStar className="text-brand-primary text-3xl" />,
    title: "Superior Quality",
    description:
      "Our brand is built on uniqueness. We translate this passion into every project and guarantee superior quality.",
  },
];

export default async function Home() {
  return (
    <HydrateClient>
      {/* Hero */}
      <section className="relative flex min-h-[65vh] w-full items-center justify-center overflow-hidden bg-gray-900 sm:min-h-[72vh] md:min-h-[82vh]">
        <Image
          src="/assets/hero.jpeg"
          alt="Unicus General Contracting project"
          fill
          className="object-cover object-center opacity-55"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="text-brand-secondary mb-4 text-xs font-semibold uppercase tracking-widest sm:text-sm">
            Calgary&apos;s Trusted Commercial Contractors
          </p>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
            Building Spaces That Work as Hard as You Do
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/85 sm:text-lg md:text-xl">
            From concept to completion, Unicus General Contracting delivers
            quality commercial builds with over 15 years of experience.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/pages/services">
              <button className="bg-brand-secondary text-brand-tertiary hover:bg-brand-secondary/90 w-full cursor-pointer rounded-xl px-8 py-3.5 font-bold transition-colors sm:w-auto sm:px-10 sm:py-4">
                Explore Services
              </button>
            </Link>
            <Link href="/pages/contact">
              <button className="w-full cursor-pointer rounded-xl border-2 border-white px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-gray-900 sm:w-auto sm:px-10 sm:py-4">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-primary text-white">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-brand-secondary text-2xl font-bold sm:text-3xl md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/75 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
            Experienced Contracting, Exceptional Results
          </h2>
          <p className="mb-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            Woodwork, painting, electrical, plumbing, installations, and more.
            Our services are delivered with quality, professionalism, efficiency,
            and durability.
          </p>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            With over{" "}
            <span className="text-brand-primary font-bold">
              15 years of experience
            </span>{" "}
            building commercial spaces, we execute your project in a
            cost-effective and construction-effective manner — from
            conceptualization to reality.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Core Values */}
      <section className="bg-brand-accent py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-3 text-base text-gray-500 sm:text-lg">
              What sets us apart on every project
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="mb-2 text-base font-bold sm:text-lg">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Unicus */}
      <section className="bg-brand-secondary py-14 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="shrink-0">
              <h2 className="text-brand-tertiary text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                Why
                <br />
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                  Unicus?
                </span>
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-brand-tertiary mb-4 text-base leading-relaxed sm:text-lg md:text-xl">
                &quot;Unicus&quot; is Latin for <em>unique</em>, and that&apos;s
                the standard we bring to every project. We believe every project
                should feel collaborative, thoughtful, and built around your
                goals.
              </p>
              <p className="text-brand-tertiary mb-8 text-base leading-relaxed sm:text-lg md:text-xl">
                With a focus on quality, communication, and craftsmanship, we
                deliver spaces that are functional, refined, and built to last.
                From first conversation to final walk-through, we make the
                process seamless and results-driven.
              </p>
              <Link href="/pages/about">
                <button className="text-brand-tertiary border-brand-tertiary hover:bg-brand-tertiary cursor-pointer rounded-xl border-2 px-6 py-3 font-semibold transition-colors hover:text-white">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactBanner
        bannerText="Ready to Take Your Project to the Next Level?"
        buttons={["services", "contact us"]}
      />
    </HydrateClient>
  );
}
