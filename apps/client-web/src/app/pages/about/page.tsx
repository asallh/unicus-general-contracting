import Image from "next/image";
import ContactBanner from "~/app/_components/ContactBanner";
import { Separator } from "radix-ui";
import { HydrateClient } from "~/trpc/server";

export default function About() {
  return (
    <HydrateClient>
      {/* Hero */}
      <section className="bg-brand-tertiary py-14 text-white sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-brand-secondary mb-3 text-xs font-semibold uppercase tracking-widest sm:text-sm">
            About Unicus
          </p>
          <h1 className="mb-6 max-w-3xl text-2xl font-bold leading-snug sm:text-3xl md:text-4xl lg:text-5xl">
            We&apos;re a Calgary-based contracting team passionate about helping
            businesses bring their dream spaces to life.
          </h1>
          <p className="max-w-2xl text-base text-white/75 sm:text-lg">
            From first idea to final build, we make the process smooth,
            collaborative, and built to last.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-brand-primary mb-4 text-2xl font-bold sm:text-3xl">
              Our Mission
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              <p>
                Our brand emphasizes a unique and quality experience as we
                transform your space through reliable construction.
              </p>
              <p>
                We pride ourselves on prioritizing our clients&apos; needs so
                you receive the best experience with an even better end result.
              </p>
              <p>
                Every project we take on is an opportunity to deliver something
                truly exceptional — on time, on budget, and beyond expectations.
              </p>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-2xl bg-gray-100 sm:h-80 lg:h-96">
            <Image
              src="https://unicus-general-contracting-storage-dev.s3.ca-west-1.amazonaws.com/projects/esso_1.webp"
              alt="Unicus project example"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      <Separator.Root className="bg-brand-primary/15 h-px w-full" decorative />

      {/* Founder */}
      <section className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <h2 className="text-brand-primary mb-10 text-2xl font-bold sm:text-3xl md:text-4xl">
          Meet the Face Behind Unicus
        </h2>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="order-2 flex-1 lg:order-1">
            <h3 className="mb-1 text-xl font-bold sm:text-2xl">
              Baldev Sallh
            </h3>
            <p className="text-brand-primary mb-5 text-sm font-semibold uppercase tracking-widest">
              Founder
            </p>
            <div className="space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              <p>At the heart of our growing team is our founder, Baldev Sallh.</p>
              <p>
                Unicus Contracting was built on the belief that great spaces
                should be both functional and inspiring. With Baldev&apos;s
                background in diverse trades, our founder set out to bring a
                hands-on, reliable, and people-first approach to commercial
                contracting.
              </p>
              <p>
                His passion for helping businesses and communities thrive is
                what brought the Unicus team together, and it&apos;s what drives
                us to bring something truly unique to every project. Baldev takes
                pride in doing things right, and is here to support Unicus&apos;s
                clients every step of the way.
              </p>
            </div>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:shrink-0">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://unicus-general-contracting-storage-dev.s3.ca-west-1.amazonaws.com/pops.webp"
                alt="Baldev Sallh — Founder of Unicus General Contracting"
                width={400}
                height={480}
                className="h-auto w-64 object-cover sm:w-80 md:w-[380px]"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <ContactBanner
        bannerText="Let's chat about how we can make your space unique!"
        buttons={["contact us"]}
      />
    </HydrateClient>
  );
}
