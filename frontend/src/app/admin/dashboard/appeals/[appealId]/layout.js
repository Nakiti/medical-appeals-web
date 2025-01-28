"use client"
import HeaderBar from "./components/headerBar"
import { use } from "react"

const AppealLayout = ({params, children}) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId

   const links = [
      { pathName: `/admin/dashboard/appeals/${appealId}`, title: "Appeal" },
      { pathName: `/admin/dashboard/appeals/${appealId}/notifications`, title: "Notifications" },
      { pathName: `/admin/dashboard/appeals/${appealId}/contact`, title: "Contact" }
   ];

   const back = `/admin/dashboard/appeals`

   return (
      <div className="p-8">
         <div className="bg-gray-100 shadow-lg rounded-md">
            <HeaderBar appealId={appealId} links={links} back={back}/>
            {children}
         </div>
      </div>
   )
}

export default AppealLayout