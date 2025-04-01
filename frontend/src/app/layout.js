"use client"
import "./globals.css";
import { AuthContextProvider } from "./context/authContext";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <AuthContextProvider>
               {children}
            </AuthContextProvider>   
         </body> 
      </html>
   );
}
