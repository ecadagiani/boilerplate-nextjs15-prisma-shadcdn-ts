import { Paths } from "@/constants/paths";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authConfig = {
  pages: {
    signIn: Paths.LOGIN,
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt", // for typescript, copy this value to auth.ts or proxy.ts
  },
  callbacks: {
    jwt({ token, user }: { token: JWT; user: User }) {
      // {account, trigger}
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      // {user}
      if (token.id) session.user.id = token.id;
      if (token.role) session.user.role = token.role;
      return session;
    },
  },
};

export default authConfig;
