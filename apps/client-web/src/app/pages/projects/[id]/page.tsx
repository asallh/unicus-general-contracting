import Image from "next/image";
import ContactBanner from "~/app/_components/ContactBanner";
import { api, HydrateClient } from "~/trpc/server";

interface ImageDisplaySection {
  url: string;
  alt: string;
}
interface ProjectDetailsPageProps {
  params: {
    id: string;
  };
}

function ImageGrid({ url, alt }: ImageDisplaySection) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]">
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </div>
  );
}

// I want this to be strictly a server side page
export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<ProjectDetailsPageProps["params"]>;
}) {
  const { id } = await params;
  const projects = await api.project.getById(id);

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
        <div className="my-6 flex flex-wrap content-center justify-center gap-3 sm:my-8 sm:gap-4">
          {projects?.imageURL?.map((url: string, idx: number) => (
            <ImageGrid
              key={url}
              url={url}
              alt={`${projects?.title} image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <ContactBanner
        bannerText="Ready to get started?"
        buttons={["services", "projects", "contact us"]}
      />
    </HydrateClient>
  );
}
