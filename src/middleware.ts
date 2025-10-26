import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const restrictedPaths = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/otp-verification",
  "/reset-password",
  "/email-verification",
  "/choose-path",
   "/",
  "/care-giver",
  "/care-provider",
  "/contact",
  "/zip-code",
  "/find-job",
  "/need-service",
  "/aboutUs",
  "/privacy",
  "/resources",
  "/faq",
  "/who-we-are",
  "/veterans",
  "/medicaid",
  "/care-service",


 
];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
     pathname.endsWith(".svg") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.startsWith("/success")||
    pathname.startsWith("/blogs")||
    pathname.startsWith("/service")
    
  ) {
    return NextResponse.next();
  }

  if ((!token && !restrictedPaths.includes(pathname)) ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export default middleware;
