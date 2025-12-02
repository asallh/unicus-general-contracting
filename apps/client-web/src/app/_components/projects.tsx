import { api } from "~/trpc/server";
import ProjectCard from "../pages/projects/_components/ProjectCard";

export default async function AllProjects() {
  const projects = await api.project.getAll();

  if (!projects) {
    return <center className="m-40 text-6xl">Something went wrong 🚨</center>;
  }
  return (
    <div className="bg-brand-accent">
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-3xl font-bold">Our Projects</h1>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {projects?.map((project) => (
              <div key={project.id} className="p-4">
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
