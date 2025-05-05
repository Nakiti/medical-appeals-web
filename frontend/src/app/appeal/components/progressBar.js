import { usePathname, useRouter } from "next/navigation";
import SaveButton from "./saveButton";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import { FormContext } from "@/app/context/formContext";
import { FaArrowLeft } from "react-icons/fa";

const ProgressBar = ({appealId, currentUser}) => {
   const pathname = usePathname();
   let keyword = pathname.split("/")[3];
   if (keyword === "login-account" || keyword === "create-account") {
      keyword = "account";
   }
   // const {currentUser} = useContext(AuthContext)
   const {isLoggedIn} = useContext(FormContext)
   console.log(isLoggedIn)
   const router = useRouter()

   const paths = [
      `/appeal/${appealId}/claim-number`,
      `/appeal/${appealId}/account`,
      `/appeal/${appealId}/form-upload`,
      `/appeal/${appealId}/appealer-details`,
      `/appeal/${appealId}/patient-details`,
      `/appeal/${appealId}/letter-details`,
      `/appeal/${appealId}/procedure-details`,
      `/appeal/${appealId}/additional-details`,
      `/appeal/${appealId}/summary`,
      `/appeal/${appealId}/review`
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
      <div className="flex flex-row items-center gap-4 p-4 sm:w-11/12 md:w-7/12 self-center mx-auto">
         <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-black"
            onClick={handleBack} // add your own handler here
         >
            <FaArrowLeft size={20} />
         </button>

         <div className="w-full">
            <div className="h-2 bg-gray-200 rounded-full">
               <div
               className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 rounded-full"
               style={{ width: `${progressPercentage}%` }}
               ></div>
                       <div className="mt-1 text-right text-xs text-gray-500 font-medium">
          Step {currentIndex + 1} of {paths.length}
        </div>
            </div>
         </div>

         {isLoggedIn || currentUser && currentIndex !== 0 ? <SaveButton /> : null}
      </div>
   );
}

export default ProgressBar