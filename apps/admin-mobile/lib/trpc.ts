import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@unicus-monorepo/api";

export const trpc = createTRPCReact<AppRouter>();