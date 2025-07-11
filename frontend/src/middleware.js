import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const middleware = (req) => {
   const token = req.cookies.get("session").value;
   // console.log("Token found: ", token);

   const isAuthPage = req.nextUrl.pathname == "/login";
   // console.log("Is login page: ", isAuthPage);

   if (!token && !isAuthPage) {
      // console.log("Redirecting to login...");
      return NextResponse.redirect(new URL("/login", req.url));
   }

   if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/user/dashboard/home"))
   }

   return NextResponse.next();

}

export const config = {
   matcher: ["/user/:path*", "/admin/:path*"],
};