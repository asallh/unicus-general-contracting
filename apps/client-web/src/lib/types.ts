import type { RouterOutputs } from "~/trpc/react";

export type Project = RouterOutputs["project"]["getAll"][number];