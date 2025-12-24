import ContactBanner from "~/app/_components/ContactBanner";
import Projects from "~/app/_components/projects";
import { HydrateClient } from "~/trpc/server";

export default function ProjectsPage() {
  return (
    <HydrateClient>
      <div className="bg-brand-tertiary">
        <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32">
          <h2 className="text-brand-accent pb-3 text-2xl font-bold sm:pb-4 sm:text-3xl md:text-4xl">
            Our Work
          </h2>
          <p className="text-brand-accent max-w-3xl text-base leading-relaxed sm:text-lg md:text-xl">
            With over <span className="font-bold">15 years of experience</span>{" "}
            building reliable projects, we have built retail stores, grocery
            marts, law offices and more. Click on a project to view more details
            & photos of our work!
          </p>
        </section>
      </div>

      <Projects />
      <ContactBanner
        bannerText="Ready for Results Like These? Let's Get Started."
        buttons={["services", "contact us"]}
      />
    </HydrateClient>
  );
}
