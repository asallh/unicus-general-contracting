import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.project.findUnique({
      where: { id: input },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        imageUrls: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({ data: input });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.project.delete({ where: { id: input } });
  }),
});
