import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const proxy = (request: NextRequest) => {
  // Add your middleware logic here (authentication, redirects, etc.)

  const response = NextResponse.next();
  response.headers.set("x-current-path", request.nextUrl.pathname);
  return response;
};

export default proxy;

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
