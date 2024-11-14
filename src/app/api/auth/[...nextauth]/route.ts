import { authFrontOptions } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import type { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

type CustomUser = User & {
  role: string;
  password: string;
}

async function getUser(email: string): Promise<CustomUser | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    });
    if(user) return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
// This is the server side options of next-auth
export const authBackendOptions: NextAuthOptions = {
  ...authFrontOptions, // we use the config from client side auth.ts, if we want to divide server and client, we should duplicate the config in auth.ts
  // Do not add config (other than providers) here, add it to clientSideOptions, in auth.ts instead

  callbacks: {
    async session({ session }) {
      if(session.user && session.user.email) {
        const dbUser = await getUser(session.user.email);
        if(dbUser) {
          const { password: _, ...userWithoutPassword } = dbUser;
          session.user = userWithoutPassword;
        }
      }
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    })
  ]
}

const handler = NextAuth(authBackendOptions);

export { handler as GET, handler as POST };

