"use client";

import { api } from "~/trpc/react";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import type { Project } from "@unicus-monorepo/api";
import Link from "next/link";
import Image from "next/image";
import { titleCase } from "~/lib/helper";

interface FeaturedCardProps {
  project: Project;
}

const FeaturedCard = ({ project }: FeaturedCardProps) => {
  const imageUrl = Array.isArray(project.imageURL)
    ? (project.imageURL[0] ?? "")
    : (project.imageURL ?? "");

  return (
    <Link href={`/pages/projects/${project.id}`} className="group block">
      <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}
        <div className="p-5">
          <h3 className="text-brand-tertiary mb-2 text-lg font-bold">
            {titleCase(project.title)}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
            {project.description}
          </p>
          <p className="text-brand-primary mt-3 text-sm font-semibold">
            View Project →
          </p>
        </div>
      </article>
    </Link>
  );
};

export function FeaturedProjects() {
  const {
    data: projects,
    isLoading,
    error,
  } = api.project.getFeatured.useQuery();

  if (isLoading) {
    return (
      <section className="bg-backgroundDark flex items-center justify-center py-20 sm:py-24">
        <Mirage size="60" speed="2.5" color="white" />
      </section>
    );
  }

  if (error) {
    console.error("Something went wrong", error);
  }

  if (!projects?.length) {
    return (
      <section className="bg-backgroundDark text-backgroundLight flex items-center justify-center py-16 sm:py-20">
        <p className="text-xl font-bold sm:text-2xl">
          Projects Coming Soon
        </p>
      </section>
    );
  }

  return (
    <section className="bg-backgroundDark py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-text-dark text-2xl font-bold sm:text-3xl md:text-4xl">
            Take a Look at Some of Our Work
          </h2>
          <p className="mt-3 text-base text-white/60 sm:text-lg">
            A sample of what we&apos;ve built across Alberta
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project) => (
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/pages/projects">
            <button className="text-brand-secondary border-brand-secondary hover:bg-brand-secondary hover:text-backgroundDark cursor-pointer rounded-xl border-2 px-8 py-3.5 font-semibold transition-colors sm:px-10 sm:py-4">
              View All Projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
