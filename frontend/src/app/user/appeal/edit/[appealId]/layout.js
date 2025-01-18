"use client"
import { FormContextProvider } from "@/app/context/formContext"
import { use } from "react"

const AppealEditLayout = ({params, children}) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId;

   return (
      <FormContextProvider appealId={appealId}>
         {children}
      </FormContextProvider>
   )
}

export default AppealEditLayout