import type { Role } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import authConfig from "./auth.config";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id?: string
    role?: Role
  }
}

declare module "next-auth" {
  // augment the session type
  interface Session {
    user: {
      role: Role
      id: string
    } & DefaultSession["user"]
  }
  interface User {
    role?: Role
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await prisma.user.findUnique({
              where: { email },
            });
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) {
              return user;
            }
          }
          return null;
        }
        catch (error) {
          console.error("providers Credentials authorize error", error);
          return null;
        }
      },
    }),
  ],
});
