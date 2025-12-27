"use client";

import { api } from "~/trpc/react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import type { Project } from "@unicus-monorepo/api";

interface FeaturedCardProps {
  title: string;
  description: string;
}

const FeaturedCard = ({ title, description }: FeaturedCardProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export function FeaturedProjects() {
  const {
    data: project,
    isLoading,
    error,
  } = api.project.getFeatured.useQuery();

  if (isLoading) {
    return (
      <section className="bg-backgroundDark py-8 sm:py-12 md:py-16">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6 md:mb-8">
          <Mirage size="60" speed="2.5" color="white" />
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Something went wrong", error);
  }

  return (
    <>
      {/* Project Samples - Full Width Dark Bacƒkground */}
      <section className="bg-backgroundDark py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-text-dark mb-6 text-center text-xl font-bold sm:mb-8 sm:text-2xl md:text-3xl">
            Take a Look at Some of our Work!
          </h2>
          <div className="text-text-dark mb-6 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6 md:mb-8">
            {project?.map((project: Project) => (
              <div key={project.id}>
                <FeaturedCard
                  title={project.title}
                  description={project.description}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="text-brand-secondary border-brand-secondary hover:bg-brand-secondary hover:text-backgroundDark rounded-lg border-2 px-6 py-3 text-center font-semibold transition-colors sm:px-8 sm:py-4">
              View All Projects!
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
