"use client";

import Image from "next/image";
import Link from "next/link";

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
      <button className="bg-brand-primary hover:bg-brand-primary/90 rounded-4xl px-6 py-2 text-base font-semibold text-white transition-colors">
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
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-xl">
      <div className="relative aspect-5/3 w-full overflow-hidden">
        <Image
          src={projectImage}
          alt={projectTitle + " Cover Image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
          unoptimized
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <h2 className="line-clamp-2 text-xl font-semibold text-slate-900">
          {projectTitle}
        </h2>
        <div className="mt-4 flex justify-end">
          <Button slug={projectId} />
        </div>
      </div>
    </article>
  );
}
