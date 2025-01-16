import { NextResponse } from "next/server";

export const middleware = (req) => {
   const token = req.cookies.get("session");
   console.log("Token found: ", token);

   const isAuthPage = req.nextUrl.pathname == "/login";
   // console.log("Is login page: ", isAuthPage);

   if (!token && !isAuthPage) {
      // console.log("Redirecting to login...");
      return NextResponse.redirect(new URL("/login", req.url));
   }
   return NextResponse.next();
}

export const config = {
   matcher: ["/user/:path*"],
};