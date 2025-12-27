import ContactBanner from "~/app/_components/ContactBanner";
import ImageGallery from "~/app/_components/ImageGallery";
import { api, HydrateClient } from "~/trpc/server";

interface ProjectDetailsPageProps {
  params: {
    id: string;
  };
}

// I want this to be strictly a server side page
export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<ProjectDetailsPageProps["params"]>;
}) {
  const { id } = await params;
  const projects = await api.project.getById(id);

  const images = projects?.imageURL?.map((url: string, idx: number) => ({
    url,
    alt: `${projects?.title} image ${idx + 1}`,
  }));

  return (
    <HydrateClient>
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
        <section className="mb-6 sm:mb-8 md:mb-12">
          <h1 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
            {projects?.title}
          </h1>
          <p className="mb-3 text-base leading-relaxed text-gray-700 sm:mb-4 sm:text-lg md:text-xl">
            {projects?.description}
          </p>
        </section>
        <ImageGallery images={images ?? []} />
      </div>
      <ContactBanner
        bannerText="Ready to get started?"
        buttons={["services", "projects", "contact us"]}
      />
    </HydrateClient>
  );
}
