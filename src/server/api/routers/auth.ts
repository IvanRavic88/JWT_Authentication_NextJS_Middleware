import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "../../../lib/auth";
import cookie from "cookie";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      const { email, password } = input;
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        //user is logged in successfully

        //return a jwt cookie to the user
        const token = await new SignJWT({})
          .setProtectedHeader({
            alg: "HS256",
          })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1m")
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );
        return { success: true };
      }
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }),
});
