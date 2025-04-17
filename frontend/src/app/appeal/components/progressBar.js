import { usePathname, useRouter } from "next/navigation";
import SaveButton from "./saveButton";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import { FormContext } from "@/app/context/formContext";
import { FaArrowLeft } from "react-icons/fa";

const ProgressBar = ({appealId, currentUser}) => {
   const pathname = usePathname();
   const keyword = pathname.split("/")[3];
   // const {currentUser} = useContext(AuthContext)
   const {isLoggedIn} = useContext(FormContext)
   const router = useRouter()

   const paths = [
      `/appeal/${appealId}/claim-number`,
      `/appeal/${appealId}/create-account`,
      `/appeal/${appealId}/form-upload`,
      `/appeal/${appealId}/patient-details`,
      `/appeal/${appealId}/letter-details`,
      `/appeal/${appealId}/procedure-details`,
      `/appeal/${appealId}/additional-details`,
      `/appeal/${appealId}/summary`,
   ];

   const currentIndex = paths.findIndex(path => path.includes(keyword));
   const progressPercentage = ((currentIndex + 1) / paths.length) * 100;
   const handleBack = () => {
      if (isLoggedIn || currentUser) {
         router.push("/user/dashboard/home")
      } else {
         router.push("/")
      }
   }

   return (
      <div className="flex flex-row items-center gap-4 p-4 sm:w-11/12 md:w-7/12 mt-4 self-center mx-auto">
         <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-black"
            onClick={handleBack} // add your own handler here
         >
            <FaArrowLeft size={20} />
         </button>

         <div className="w-full">
            <div className="h-2 bg-gray-200 rounded-full">
               <div
               className="h-2 bg-blue-800 rounded-full transition-all duration-300"
               style={{ width: `${progressPercentage}%` }}
               ></div>
            </div>
         </div>

         {isLoggedIn || currentUser && currentIndex !== 0 ? <SaveButton /> : null}
      </div>


   );
}

export default ProgressBar