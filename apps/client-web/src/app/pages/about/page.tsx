import { HydrateClient } from "~/trpc/server";

export default function About() {
  return (
    <HydrateClient>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">About Page</h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Content coming soon...</p>
      </div>
    </HydrateClient>
  );
}
