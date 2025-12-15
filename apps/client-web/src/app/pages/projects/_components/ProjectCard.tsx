"use client";

import Image from "next/image";
import Link from "next/link";
import { titleCase } from "~/lib/helper";

interface ProjectCardProps {
  projectId: string;
  projectTitle: string;
  projectImage: string;
}

interface ButtonProps {
  slug: string;
}

function Button({ slug }: ButtonProps) {
  return (
    <Link href={`/pages/projects/${slug}`}>
      <button className="bg-brand-primary hover:bg-brand-primary/90 rounded-4xl px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white transition-colors w-full sm:w-auto">
        View Project
      </button>
    </Link>
  );
}

export default function ProjectCard({
  projectId,
  projectTitle,
  projectImage,
}: ProjectCardProps) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl">
      <div className="relative aspect-5/3 w-full overflow-hidden">
        <Image
          src={projectImage}
          alt={projectTitle + " Cover Image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 512px"
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col px-4 sm:px-5 pt-3 sm:pt-4 pb-4 sm:pb-5">
        <h2 className="line-clamp-2 text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">
          {titleCase(projectTitle)}
        </h2>
        <div className="mt-auto flex justify-end">
          <Button slug={projectId} />
        </div>
      </div>
    </article>
  );
}
