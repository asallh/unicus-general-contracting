import { HydrateClient } from "~/trpc/server";
import Projects from "./_components/projects";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Projects />
      </main>
    </HydrateClient>
  );
}
