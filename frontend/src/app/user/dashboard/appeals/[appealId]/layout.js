"use client"
import { use } from "react"
import { FormContextProvider } from "@/app/context/formContext"
import HeaderBar from "./components/headerBar"


const AppealLayout = ({params, children}) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId

   const links = [
      {pathName: `/user/dashboard/appeals/${appealId}/details/patient`, title: "Details"},
      // {pathName: `/user/dashboard/appeals/${appealId}/people`, title: "People"},
      {pathName: `/user/dashboard/appeals/${appealId}/documents`, title: "Documents"},
      {pathName: `/user/dashboard/appeals/${appealId}/research`, title: "Research"},
      // {pathName: `/user/dashboard/appeals/${appealId}/updates`, title: "Updates"},
      {pathName: `/user/dashboard/appeals/${appealId}/letter`, title: "Generate Letter"},
   ]

   const back = "/user/dashboard/appeals"

   return (
      <div className="">
         <FormContextProvider appealId={appealId}>
            <div className="bg-white rounded-md">
               <HeaderBar appealId={appealId} links={links} back={back}/>
               {children}
            </div>
         </FormContextProvider>
      </div>
   )
}

export default AppealLayout