import ContactBanner from "~/app/_components/ContactBanner";
import ImageGallery from "~/app/_components/ImageGallery";
import { api, HydrateClient } from "~/trpc/server";
import Link from "next/link";

interface ProjectDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<ProjectDetailsPageProps["params"]>;
}) {
  const { id } = await params;
  const project = await api.project.getById(id);

  const images = project?.imageURL?.map((url: string, idx: number) => ({
    url,
    alt: `${project?.title} image ${idx + 1}`,
  }));

  return (
    <HydrateClient>
      {/* Header */}
      <section className="bg-brand-tertiary py-12 text-white sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Link
            href="/pages/projects"
            className="text-brand-secondary mb-4 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
          >
            ← Back to Projects
          </Link>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            {project?.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16">
        {project?.description && (
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
            {project.description}
          </p>
        )}
        <ImageGallery images={images ?? []} />
      </div>

      <ContactBanner
        bannerText="Ready to get started?"
        buttons={["services", "projects", "contact us"]}
      />
    </HydrateClient>
  );
}
