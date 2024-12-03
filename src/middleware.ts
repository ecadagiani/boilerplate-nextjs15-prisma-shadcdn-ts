import { Role } from "@prisma/client";
import NextAuth, { type Session } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import { Paths } from "./constants/paths";
 
const { auth } = NextAuth({
  ...authConfig,
  providers: [],
  session: {
    strategy: "jwt",
  },
});


export default auth((request: NextRequest & { auth: Session | null }) =>{

  const isConnected = request.auth !== null;
  const userRole = request.auth?.user?.role;

  const homeURL = new URL(Paths.HOME, request.nextUrl.origin);
  const loginURLWithCallback = new URL(Paths.LOGIN, request.nextUrl.origin);
  loginURLWithCallback.searchParams.set("callbackUrl", request.nextUrl.pathname);

  if(request.nextUrl.pathname.startsWith(Paths.ADMIN) && userRole !== Role.ADMIN) {
    if(!isConnected) {
      return NextResponse.redirect(loginURLWithCallback);
    }
    return NextResponse.redirect(homeURL);
  }

  if(request.nextUrl.pathname.startsWith(Paths.DASHBOARD) && !isConnected) {
    return NextResponse.redirect(loginURLWithCallback);
  }

  if(request.nextUrl.pathname.startsWith(Paths.LOGIN) && isConnected) {
    return NextResponse.redirect(homeURL);
  }
  
  // this method is important, is the only way to set a new header, and keep returning data from server actions
  const response = NextResponse.next();
  response.headers.set("x-current-path", request.nextUrl.pathname);
  return response;
});

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};