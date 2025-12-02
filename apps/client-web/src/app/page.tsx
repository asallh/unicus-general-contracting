import { HydrateClient } from "~/trpc/server";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden bg-gray-100 md:h-[75vh]">
        <Image
          src="/assets/hero.jpeg"
          alt="Office"
          fill={true}
          className="object-cover object-center opacity-100"
          priority
        />
        <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center rounded bg-black/40">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
            Welcome to Unicus General Contracting
          </h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-8">
        <div>
          {/* Experincing Contractor */}
          <h1>Title</h1>
          <p>Description</p>
        </div>
        <div>
          {/* Project Samples */}
          <h2>Project Samples</h2>
          <p>Description</p>
        </div>
        <div>
          {/* Selling Points*/}
          <h2>Project Samples</h2>
          <p>Description</p>
        </div>
        <div>
          {/* Statement*/}
          <h2>Statement</h2>
          <p>Description</p>
        </div>
        <div>
          {/* Carosuel */}
          <p>Gallery</p>
        </div>
      </section>
    </HydrateClient>
  );
}
