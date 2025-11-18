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
    <div className="flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
      <div className="relative aspect-5/3 w-full">
      <Image
        src={projectImage}
        alt={projectTitle + " Cover Image"}
        fill
        className="rounded-t-2xl object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
        unoptimized
      />
      </div>
      <h2 className="mx-4 pt-6 text-2xl font-semibold text-gray-900">
      {projectTitle}
      </h2>
      <div className="mx-2 mt-6 mb-4 flex w-full">
      <Button slug={projectId} />
      </div>
    </div>
  );
}
