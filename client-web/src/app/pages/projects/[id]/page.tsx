import Image from "next/image";
import { api } from "~/trpc/server";

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
  return <Image src={url} alt={alt} height={100} width={100} />;
}

// I want this to be strictly a server side page
export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const projects = await api.project.getById(params.id);

  return (
    <div>
      <section>
        <div className="text-xl">{projects?.title}</div>
        <div className="text-xl">{projects?.description}</div>
        <div className="text-xl">{projects?.updatedAt.toDateString()}</div>
      </section>
      <div className="mt-4 flex flex-row gap-4">
        {projects?.imageURL?.map((url: string, idx: number) => (
          <ImageGrid
            key={url}
            url={url}
            alt={`${projects?.title} image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
