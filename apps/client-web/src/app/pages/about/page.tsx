import { HydrateClient } from "~/trpc/server";

export default function About() {
  return (
    <HydrateClient>
      <div>About Page</div>
    </HydrateClient>
  );
}
