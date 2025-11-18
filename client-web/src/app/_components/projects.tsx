import { api } from "~/trpc/server";
import ProjectCard from "../pages/projects/_components/ProjectCard";

export default async function AllProjects() {
  const projects = await api.project.getAll();
  console.log("AllProjects -> projects", projects);

  return (
    <div className="bg-brand-accent">
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-3xl font-bold">Our Projects</h1>

        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 md:grid-cols-3">
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
      </div>
    </div>
  );
}
