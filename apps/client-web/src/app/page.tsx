import { HydrateClient } from "~/trpc/server";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <section className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden bg-gray-100 sm:h-[60vh] md:h-[75vh]">
        <Image
          src="/assets/hero.jpeg"
          alt="Office"
          fill={true}
          className="object-cover object-center opacity-100"
          priority
          sizes="100vw"
        />
        <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center rounded bg-black/40 px-4">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl text-center">
            Welcome to Unicus General Contracting
          </h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Experincing Contractor */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Title</h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Description</p>
        </div>
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Project Samples */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Project Samples</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Description</p>
        </div>
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Selling Points*/}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Project Samples</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Description</p>
        </div>
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Statement*/}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Statement</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Description</p>
        </div>
        <div className="mb-8 sm:mb-12 md:mb-16">
          {/* Carosuel */}
          <p className="text-base sm:text-lg text-gray-700">Gallery</p>
        </div>
      </section>
    </HydrateClient>
  );
}
