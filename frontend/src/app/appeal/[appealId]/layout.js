"use client"
import Header from "../../components/header"
import ProgressBar from "../components/progressBar"
import { FormContextProvider } from "../../context/formContext"
import { use, useContext, useEffect } from "react"
import { FormContext } from "../../context/formContext"
import { AuthContext } from "@/app/context/authContext"
import { useRouter, usePathname } from "next/navigation"

const AppealLayout = ({ params, children }) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId
   const {currentUser} = useContext(AuthContext)

   useEffect(() => {
      const handleBeforeUnload = (e) => {
         e.preventDefault();
         e.returnValue = ""; // This triggers the confirmation dialog in most browsers
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, []);

   return (
      <FormContextProvider appealId={appealId}>
         <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-slate-100 text-gray-800">
            <Header />
            <ProgressBar appealId={appealId} currentUser={currentUser}/>
            {children}
         </div>
      </FormContextProvider>
   )
}

export default AppealLayout
