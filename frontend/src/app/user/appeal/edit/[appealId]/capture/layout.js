"use client"
import { IoIosArrowBack } from "react-icons/io"
import Link from "next/link"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import { useRouter } from "next/navigation"

const CaptureLayout = ({children}) => {
   const {appealId} = useContext(FormContext)
   const router = useRouter()

   return (
      <div className="relative w-full h-full min-h-screen bg-black">
         <div className="w-full flex items-center justify-between bg-black text-white py-4 px-6">
            <button 
               className="text-white text-md"
               // href={`/user/appeal/edit/${appealId}/form/initial`}
               onClick={() => router.back()}
            >
               <IoIosArrowBack size={24} />
            </button>
            <h1 className="text-center text-lg font-semibold">Capture</h1>
            <Link href={`/user/appeal/edit/${appealId}/form/initial`}>
               <button className="text-white text-md">
                  Done
               </button>
            </Link>
         </div>
         {children}
      </div>
   )
}

export default CaptureLayout