import ProgressBar from "./progressBar";
import { useContext } from "react";
import { FormContext } from "@/app/context/formContext";


import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineCampaign } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { FaPeopleArrows } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const Navbar = () => {
   const {userId, appealId} = useContext(FormContext)

   return (
      <div className="border-b border-gray-700 bg-gray-900 text-white p-4 flex flex-col space-y-3">
         {/* Top Section */}
         <div className="flex items-center justify-between w-11/12 mx-auto">
            <div className="flex items-center">
               {/* Icon */}
               <IoDocumentTextOutline className="h-16 w-16 p-1 border-2 border-white rounded-sm mr-3" />
               <div className="flex flex-col text-gray-100">
                  <h1 className="text-2xl font-bold">Internal Campaign Name</h1>
                  <p className="text-sm font-medium text-gray-400 mt-1">dste</p>
               </div>
            </div>
            {/* Save Button */}
            <div>
               <button 
                  className="bg-blue-600 hover:bg-blue-500 py-2 px-6 rounded-sm text-sm font-medium text-white transition-transform transform hover:scale-105"
                  // onClick={handlePublish}
               >
                  Save
               </button>
            </div>
         </div>

         {/* Progress Bar */}
         <ProgressBar userId={userId} appealId={appealId} />
      </div>

   );
};

export default Navbar;
