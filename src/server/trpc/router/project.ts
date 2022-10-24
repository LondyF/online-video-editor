import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const projectRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const projects = ctx.prisma.project.findMany({
      where: {
        userId,
      },
    });

    return await projects;
  }),
  byId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const project = ctx.prisma.project.findFirstOrThrow({
      where: {
        userId,
        id: input,
      },
    });

    return project;
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const project = await ctx.prisma.project.create({
        data: {
          userId,
          name: input.name,
        },
      });

      return project;
    }),
});
