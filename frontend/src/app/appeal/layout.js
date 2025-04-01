"use client"
import Header from "../components/header"
import ProgressBar from "./components/progressBar"
import { FormContextProvider } from "../context/formContext"

const AppealLayout = ({ children }) => {
   return (
      <FormContextProvider>
         <div className="bg-gray-50 min-h-screen">
            <Header />
            <ProgressBar />
            {children}
         </div>
      </FormContextProvider>
   )
}

export default AppealLayout
