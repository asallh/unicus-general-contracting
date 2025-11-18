"use client";

import Image from "next/image";

interface ProjectCardProps {
  projectTitle: string;
  projectImage: string;
}

function Button() {
  return (
    <button className="bg-brand-primary hover:bg-brand-primary/90 rounded-4xl px-6 py-2 text-base font-semibold text-white transition-colors">
      View Project
    </button>
  );
}

export default function ProjectCard({
  projectTitle,
  projectImage,
}: ProjectCardProps) {
  return (
    <div className="flex w-80 max-w-full flex-col overflow-hidden rounded-xl bg-white p-4 shadow-lg">
      <Image
        src={projectImage}
        alt={projectTitle + " Cover Image"}
        height={180}
        width={320}
        className="rounded-lg object-cover"
        unoptimized
      />
      <h2 className="pt-4 text-lg font-semibold text-gray-900">
        {projectTitle}
      </h2>
      <div className="mt-4 flex w-full">
        <Button />
      </div>
    </div>
  );
}
