"use client"
import { FormContextProvider } from "@/app/context/formContext"
import { use } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

const AppealEditLayout = ({children}) => {
   // const unwrappedParams = use(params)
   // const appealId = unwrappedParams.appealId;
   const paramse = useParams()
   console.log(paramse)
   const appealId = paramse.appealId

   return (
      <FormContextProvider appealId={appealId}>
         {children}
      </FormContextProvider>
   )
}

export default AppealEditLayout