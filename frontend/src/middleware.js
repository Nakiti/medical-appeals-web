import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const middleware = (req) => {
   const token = req.cookies.get("session");
   console.log("Token found: ", token);

   const isAuthPage = req.nextUrl.pathname == "/login";
   // console.log("Is login page: ", isAuthPage);

   if (!token && !isAuthPage) {
      // console.log("Redirecting to login...");
      return NextResponse.redirect(new URL("/login", req.url));
   }

   if (token) {
      try {
         // Decode the token to get user information
         const decodedToken = jwt.decode(token.value);
         const userType = decodedToken.userType

         console.log("Decoded token: ", decodedToken);

         const pathname = req.nextUrl.pathname;

         if (pathname.startsWith("/admin")) {
            if (userType !== "admin") {
               console.log("Non-admin user trying to access admin path. Redirecting...");
               return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
         } else if (pathname.startsWith("/user")) {
            if (userType === "admin") {
               console.log("Admin user trying to access user path. Redirecting...");
               return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
         }

         return NextResponse.next();
      } catch (error) {
         console.error("Token decoding failed: ", error);
         return NextResponse.redirect(new URL("/login", req.url));
      }
   }
}

export const config = {
   matcher: ["/user/:path*", "/admin/:path*"],
};