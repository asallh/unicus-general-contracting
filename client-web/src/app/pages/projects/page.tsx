import Projects from "~/app/_components/projects";
import { HydrateClient } from "~/trpc/server";

export default function ProjectsPage() {
  return (
    <HydrateClient>
      <div className="bg-brand-tertiary">
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-brand-accent">Our Work</h2>
          <p className="text-brand-accent">
            With over <span className="font-bold">15 years of experience</span>{" "}
            building reliable projects, we have built retail stores, grocery
            marts, law offices and more. Click on a project to view more details
            & photos of our work!
          </p>
        </section>
      </div>

      <Projects />
    </HydrateClient>
  );
}
