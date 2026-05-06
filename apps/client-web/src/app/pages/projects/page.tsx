import ContactBanner from "~/app/_components/ContactBanner";
import Projects from "~/app/_components/projects";
import { HydrateClient } from "~/trpc/server";

export default function ProjectsPage() {
  return (
    <HydrateClient>
      {/* Hero */}
      <section className="bg-brand-tertiary py-14 text-white sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-brand-secondary mb-3 text-xs font-semibold uppercase tracking-widest sm:text-sm">
            Our Portfolio
          </p>
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Our Work
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg md:text-xl">
            With over{" "}
            <span className="text-brand-secondary font-bold">
              15 years of experience
            </span>{" "}
            building reliable projects, we have built retail stores, grocery
            marts, law offices and more. Click on a project to view more details
            &amp; photos.
          </p>
        </div>
      </section>

      <Projects />

      <ContactBanner
        bannerText="Ready for Results Like These? Let's Get Started."
        buttons={["services", "contact us"]}
      />
    </HydrateClient>
  );
}
