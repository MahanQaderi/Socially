import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { enabled: true },
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [nextCookies()],
  trustedOrigins: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      partitioned: true,
    },
  },
});
