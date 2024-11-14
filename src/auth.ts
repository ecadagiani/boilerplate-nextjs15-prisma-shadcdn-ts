import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";

export const authFrontOptions = {  
  pages: {
    signIn: "/login" // can be customised
  },
  debug: process.env.NODE_ENV === "development",
  providers: [],
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authFrontOptions)
}

export function isProtectedRoute(pathname: string) {
  if(!pathname.startsWith('/')) pathname = '/' + pathname;

  return pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
}