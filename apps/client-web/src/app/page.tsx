import { HydrateClient } from "~/trpc/server";
import Image from "next/image";
import ContactBanner from "./_components/ContactBanner";
import { FeaturedProjects } from "./_components/FeaturedProjects";

export default async function Home() {
  return (
    <HydrateClient>
      <section className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden bg-gray-100 sm:h-[60vh] md:h-[75vh]">
        <Image
          src="/assets/hero.jpeg"
          alt="Office"
          fill={true}
          className="object-cover object-center opacity-100"
          priority
          sizes="100vw"
        />
        <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center rounded bg-black/40 px-4">
          <h1 className="text-center text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
            Welcome to Unicus General Contracting
          </h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Experincing Contractor */}
          <h1 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            Experienced Contracting
          </h1>
          <div className="text-base leading-relaxed text-gray-700 sm:text-lg">
            <p className="mb-8">
              Experienced Contracting Woodwork, painting, electrical, plumbing,
              installations, and more. Our services are varied and are promised
              with quality, professionalism, efficiency, and durability. Our
              experienced contracting team has extensive knowledge building
              various spaces with over{" "}
              <span className="text-xl font-bold">15 years of experience.</span>{" "}
              From conceptualization to reality, we aim to execute your project
              in a cost effective & construction effective manner.
            </p>
            <p>
              View our service list and reach out to us about your next project!
            </p>
          </div>
        </div>
      </section>
      <FeaturedProjects />
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Selling Points*/}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex-1">
              <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl">
                Core Values{" "}
              </h2>
              <ol className="list-outside list-decimal space-y-4 pl-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                <li>
                  <h3 className="inline font-semibold">
                    support from concept to creation
                  </h3>
                  <p>
                    We recognize that our clients have a dream vision and
                    whether or not you have a design plan, we ensure you feel
                    supported as we collaborate and turn your vision into
                    reality.
                  </p>
                </li>
                <li>
                  <h3 className="inline font-semibold">
                    reliable construction
                  </h3>
                  <p>
                    We pride ourselves on bringing reliable construction to our
                    clients 100% of the time.
                  </p>
                </li>
                <li>
                  <h3 className="inline font-semibold">
                    experts in efficiency and consistency
                  </h3>
                  <p>
                    Our team has mastered a signature process to building,
                    sourcing, planning the most efficient and consistent
                    projects.
                  </p>
                </li>
                <li>
                  <h3 className="inline font-semibold">superior quality</h3>
                  <p>
                    Our brand is based on the foundation of being unique, we
                    translate this passion into every project and build. We
                    guarantee superior quality with every project.
                  </p>
                </li>
              </ol>
            </div>
            <div className="m-auto flex-1">
              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-200 sm:h-80 lg:h-96">
                <Image
                  src={
                    "https://unicus-general-contracting-storage-dev.s3.ca-west-1.amazonaws.com/projects/esso_1.webp"
                  }
                  width={800}
                  height={600}
                  alt="Esso Project"
                  className="flex h-full items-center justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Unicus - Full Width Yellow Background */}
      <section className="bg-brand-secondary py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="shrink-0">
              <h2 className="text-brand-tertiary text-xl font-bold sm:text-2xl md:text-4xl lg:text-5xl">
                Why
                <br />
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
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
              <p className="text-brand-tertiary text-base leading-relaxed sm:text-lg md:text-xl">
                With a focus on quality, communication, and craftsmanship, we
                deliver spaces that are functional, refined, and built to last.
                From first conversation to final walk-through, we make the
                process seamless and results-driven, because great work starts
                with great relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* To Do Future Feature Implementation */}
      {/* <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <p className="text-base text-gray-700 sm:text-lg">Gallery</p>
        </div>
      </section> */}

      <ContactBanner
        bannerText="Ready to Take your Project to the Next Level?"
        buttons={["services", "contact us"]}
      />
    </HydrateClient>
  );
}
