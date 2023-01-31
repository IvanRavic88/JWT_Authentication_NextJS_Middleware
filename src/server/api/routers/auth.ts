import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(({ input }) => {}),
});
