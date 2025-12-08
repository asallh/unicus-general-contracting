import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generateProjectDescription, uploadImageToS3 } from "../lib";

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
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({ data: input });
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.db.project.delete({ where: { id: input } });
  }),

  generateDescription: publicProcedure
    .input(
      z.object({
        title: z.string(),
        briefDescription: z.string().optional(),
        images: z.array(
          z.object({
            base64: z.string(), // Base64 encoded image
            mimeType: z.string(), // e.g., "image/jpeg"
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { title, briefDescription, images } = input;

      // Extract base64 strings (remove data URL prefix if present)
      const imageBase64s = images
        .map((img) => {
          // Remove "data:image/jpeg;base64," prefix if it exists
          if (img.base64.includes(",")) {
            const parts = img.base64.split(",");
            return parts[1] || img.base64;
          }
          return img.base64;
        })
        .filter((base64): base64 is string => Boolean(base64));

      // Call OpenAI to generate description
      const description = await generateProjectDescription(
        title,
        briefDescription,
        imageBase64s
      );

      return { description };
    }),

  createWithImages: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        images: z.array(
          z.object({
            base64: z.string(),
            mimeType: z.string(),
            fileName: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, images } = input;
      console.log("Uplaoding to S3 🪣")
      // Upload all images to S3 and get URLs
      const imageUrls = await Promise.all(
        images.map(async (img) => {
          // Convert base64 to buffer
          let base64String: string;
          if (img.base64.includes(",")) {
            const parts = img.base64.split(",");
            base64String = parts[1] || img.base64;
          } else {
            base64String = img.base64;
          }

          const buffer = Buffer.from(base64String, "base64");

          // Generate unique filename
          const timestamp = Date.now();
          const randomStr = Math.random().toString(36).substring(7);
          const extension = img.fileName.split(".").pop() || "jpg";
          const fileName = `${timestamp}-${randomStr}.${extension}`;

          // Upload to S3
          const url = await uploadImageToS3(buffer, fileName, img.mimeType);

          return url;
        })
      );

      // Create project in database with image URLs
      console.log("Uploading to SupaBase ⚡")
      return ctx.db.project.create({
        data: {
          title,
          description,
          imageURL: imageUrls, 
        },
      });
    }),
});
