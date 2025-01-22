"use client"

import HeaderBar from "@/app/admin/dashboard/appeals/[appealId]/components/headerBar"
import { use } from "react"

const AppealLayout = ({params, children}) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId

   const links = [
      {pathName: `/user/dashboard/appeals/${appealId}`, title: "Appeal"},
      {pathName: `/user/dashboard/appeals/${appealId}/updates`, title: "Updates"},
   ]

   const back = "/user/dashboard/appeals"

   return (
      <div className="md:p-8">
         <div className="bg-white shadow-md rounded-md">
            <HeaderBar appealId={appealId} links={links} back={back}/>
            {children}
         </div>
      </div>
   )
}

export default AppealLayout