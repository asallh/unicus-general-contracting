import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <div>
          This de Home page
        </div>
      </main>
    </HydrateClient>
  );
}
