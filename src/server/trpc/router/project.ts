import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { router, protectedProcedure } from "../trpc";

export const projectRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const projects = await ctx.prisma.project.findMany({
      where: {
        OR: [
          {
            userId,
          },
          {
            collaborators: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return projects;
  }),
  byId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const project = ctx.prisma.project.findFirstOrThrow({
      where: {
        id: input,
        OR: [
          {
            userId,
          },
          {
            collaborators: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    });

    return project;
  }),
  collaborators: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const collaborators = ctx.prisma.project.findFirstOrThrow({
        where: {
          id: input,
          AND: [
            {
              userId,
            },
          ],
        },
        include: {
          collaborators: {
            include: {
              user: true,
            },
          },
        },
      });

      return collaborators;
    }),
  addCollaborator: protectedProcedure
    .input(z.object({ projectId: z.string(), collaboratorId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.prisma.project.findFirstOrThrow({
        where: {
          id: input.projectId,
        },
      });

      // Throw error when trying to add project owner as a project collaborator
      if (project.userId === input.collaboratorId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project owner can't be added as an project collaborator",
        });
      }

      // Add collaborator
      const collaborator = await ctx.prisma.projectCollaborators.create({
        data: {
          projectId: project.id,
          userId: input.collaboratorId,
        },
      });

      return collaborator;
    }),
  removeCollaborator: protectedProcedure
    .input(z.object({ projectId: z.string(), collaboratorId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.projectCollaborators.delete({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.collaboratorId,
          },
        },
      });
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
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedProject = await ctx.prisma.project.delete({
        where: {
          id: input,
        },
      });

      return deletedProject;
    }),
  // onSave: protectedProcedure.subscription(() => {
  //   return observable<string>((emit) => {
  //     const onSave = (data: string) => {
  //       emit.next(data);
  //     };

  //     // Tell our event emitter to trigger onSave
  //     ee.on("save", onSave);

  //     // Clean up
  //     return () => {
  //       ee.off("save", onSave);
  //     };
  //   });
  // }),
  // save: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
  //   // Emit Save
  //   ee.emit("save", input);

  //   return input;
  // }),
});
