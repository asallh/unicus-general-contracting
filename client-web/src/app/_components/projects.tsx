'use client'
import { api } from "~/trpc/react";

export default function AllProjects() {
  const { data: projects, isLoading } = api.project.getAll.useQuery();

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Our Projects</h1>
      <div className="grid grid-cols-1 gap-4">
        {projects?.map((project) => (
          <div key={project.id} className="rounded-md border p-4">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
