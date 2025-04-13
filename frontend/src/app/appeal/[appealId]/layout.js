"use client"
import Header from "../../components/header"
import ProgressBar from "../components/progressBar"
import { FormContextProvider } from "../../context/formContext"
import { use, useContext } from "react"
import { FormContext } from "../../context/formContext"

const AppealLayout = ({ params, children }) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId

   return (
      <FormContextProvider appealId={appealId}>
         <div className="bg-gray-50 min-h-screen">
            <Header />
            <ProgressBar appealId={appealId}/>
            {children}
         </div>
      </FormContextProvider>
   )
}

export default AppealLayout
