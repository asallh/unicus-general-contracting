import { api } from "~/trpc/server";
import ProjectCard from "../pages/projects/_components/ProjectCard";
import type { Project } from "@unicus-monorepo/api";

export default async function AllProjects() {
  const projects = await api.project.getAll();

  if (!projects) {
    return (
      <div className="bg-brand-accent flex min-h-[50vh] items-center justify-center p-4">
        <p className="text-center text-2xl font-bold sm:text-4xl">
          Something went wrong
        </p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-brand-accent flex min-h-[50vh] items-center justify-center p-4">
        <p className="text-center text-xl font-bold sm:text-2xl md:text-4xl">
          Projects Currently Under Construction
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-accent py-14 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              projectTitle={project.title}
              projectImage={
                Array.isArray(project.imageURL)
                  ? (project.imageURL[0] ?? "")
                  : (project.imageURL ?? "")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
