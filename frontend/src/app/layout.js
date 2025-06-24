"use client"
import "./globals.css";
import { AuthContextProvider } from "./context/authContext";
import { SidebarContextProvider } from "./context/sidebarContext";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <AuthContextProvider>
               <SidebarContextProvider>
                  {children}
               </SidebarContextProvider>
            </AuthContextProvider>   
         </body> 
      </html>
   );
}
