"use client"
import useFormInput from "@/app/hooks/useFormInput"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"

const Information = () => {
   const {info, handleInfoChange, setInfo} = useFormInput({})

   return (
      <div className="w-full h-full overflow-y-auto">
         <div className="p-6 bg-gray-50">
            <div className="w-full h-full p-8 bg-white rounded-lg shadow-sm ">
               <Link 
                  href={`/user/dashboard/settings`}
                  className="text-gray-700 flex flex-row items-center space-x-2"
               >
                  <FaArrowLeft className="text-gray-700"/>
                  <p>Settings</p>
               </Link>
               <div className="p-6">
                  <h1 className="text-3xl font-semibold mb-4 text-gray-800">Your Information</h1>
                  <p className="text-gray-700">Manage details pertaining to your account</p>
               </div>
               <div className="w-full max-w-4xl p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">General:</h2>
                  <div className="space-y-6">
                     <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-semibold mb-2">Organization Name</label>
                        <input
                           type="text"
                           name="name"
                           placeholder="Name"
                           // value={info.name}
                           className="w-full text-md bg-gray-50 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-semibold mb-2">Organization URL</label>
                        <input
                           type="text"
                           name="url"
                           placeholder="URL"
                           // value={info.url}
                           className="w-full text-md bg-gray-50 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>
                  </div>
                  <div className="flex justify-end mt-6">
                     <button
                        // onClick={handleUpdate}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                     >
                        Save Changes
                     </button>
                  </div>
               </div>
               <div className="w-full border-b border-gray-300 my-4 "/>
            </div>
         </div>
      </div>
   )
}

export default Information