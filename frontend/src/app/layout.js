"use client"
import "./globals.css";
import { AuthContextProvider } from "./context/authContext";
import { SidebarContextProvider } from "./context/sidebarContext";
import { useEffect } from "react";
import { getCurrentUser } from "./services/fetchServices";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
   const router = useRouter()

   useEffect(() => {
      const fetchData = async() => {
         const user = await getCurrentUser()
         if (!user) {   
            router.push("/login")
         }
      }

      fetchData()
   }, [])

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
