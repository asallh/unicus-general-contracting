"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  projectTitle: string;
  projectImage: string;
  slug: string;
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
  projectTitle,
  projectImage,
  slug,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl w-full max-w-lg">
      <div className="relative aspect-video w-full">
      <Image
        src={projectImage}
        alt={projectTitle + " Cover Image"}
        fill
        className="rounded-t-2xl object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 448px"
        unoptimized
      />
      </div>
      <h2 className="pt-6 text-2xl font-semibold text-gray-900 mx-4">
        {projectTitle}
      </h2>
      <div className="mt-6 flex w-full mb-4 mx-2">
        <Button slug={slug} />
      </div>
    </div>
  );
}
