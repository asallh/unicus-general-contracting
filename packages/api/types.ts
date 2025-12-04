import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./root";

export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type Project = RouterOutputs["project"]["getAll"][number];