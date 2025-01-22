import ProgressBar from "./progressBar";
import { useContext } from "react";
import { FormContext } from "@/app/context/formContext";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { updateAppeal } from "@/app/services/updateServices";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
   const {userId, appealId, inputs, documents} = useContext(FormContext)
   const router = useRouter()

   const handleSave = async() => {
      console.log("click")
      try {
         await updateAppeal(appealId, inputs, documents)
         router.push("/user/dashboard/drafts")
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className='flex flex-row justify-between mb-4 border-b-2 pb-3'>
         <div className='space-y-2 ml-4 md:ml-8 md:mb-4'>
            <Link href={`/user/dashboard/home`} className='flex flex-row items-center space-x-2'>
               <FaArrowLeft />
               <p className='text-xs md:text-sm'>Back to Home</p>
            </Link>
            <h1 className='text-lg md:text-2xl'>Appeal Internal Name</h1>
         </div>
         <button
            className="bg-blue-600 hover:bg-blue-500 h-1/2 mr-8 self-center py-2 px-6 rounded-sm text-sm font-medium text-white transition-transform transform hover:scale-105"
            onClick={handleSave}
         >
            Save
         </button>
      </div>

   );
};

export default Navbar;
