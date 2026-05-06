"use client";

import Image from "next/image";
import Link from "next/link";
import { titleCase } from "~/lib/helper";

interface ProjectCardProps {
  projectId: string;
  projectTitle: string;
  projectImage: string;
}

export default function ProjectCard({
  projectId,
  projectTitle,
  projectImage,
}: ProjectCardProps) {
  return (
    <Link href={`/pages/projects/${projectId}`} className="group block">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-xl">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={projectImage}
            alt={projectTitle + " Cover Image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <h2 className="mb-4 line-clamp-2 text-lg font-semibold text-slate-900 sm:text-xl">
            {titleCase(projectTitle)}
          </h2>
          <div className="mt-auto">
            <span className="bg-brand-primary inline-block rounded-xl px-5 py-2 text-sm font-semibold text-white transition-colors group-hover:opacity-90 sm:text-base">
              View Project
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
