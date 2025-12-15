import { api } from "~/trpc/server";
import ProjectCard from "../pages/projects/_components/ProjectCard";
import type { Project } from "@unicus-monorepo/api";

export default async function AllProjects() {
  const projects = await api.project.getAll();

  if (!projects) {
    return (
      <div className="bg-brand-accent min-h-[50vh] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl sm:text-4xl md:text-6xl font-bold">
            Something went wrong 🚨
          </p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-brand-accent min-h-[50vh] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl sm:text-2xl md:text-4xl font-bold">
            🏗️ 🛠️ Projects cuurently Under Construction 👷 🚧
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-brand-accent">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold">Our Projects</h1>

        <section className="mx-auto max-w-6xl px-2 sm:px-4 py-6 sm:py-8 md:py-10">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project: Project) => (
              <div key={project.id} className="p-2 sm:p-4">
                <ProjectCard
                  projectId={project.id}
                  projectTitle={project.title}
                  projectImage={
                    Array.isArray(project.imageURL)
                      ? (project.imageURL[0] ?? "")
                      : (project.imageURL ?? "")
                  }
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
