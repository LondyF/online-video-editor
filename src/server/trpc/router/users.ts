import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

const allQuerySchema = z
  .object({
    excludeMe: z.boolean(),
  })
  .optional();

export const usersRouter = router({
  all: protectedProcedure
    .input(allQuerySchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const users = ctx.prisma.user.findMany({
        where: {
          ...(input?.excludeMe && {
            NOT: {
              id: userId,
            },
          }),
        },
      });

      return users;
    }),
});
