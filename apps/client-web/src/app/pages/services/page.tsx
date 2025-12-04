import { HydrateClient } from "~/trpc/server";

export default function ServicesPage() {
  return (
    <HydrateClient>
      <div>Services Page</div>
    </HydrateClient>
  );
}
