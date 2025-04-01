import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import SaveButton from "./saveButton";

const ProgressBar = () => {
   const pathname = usePathname();
   const keyword = pathname.split("/")[2];

   const paths = [
      `/appeal/claim-number`,
      `/appeal/create-account`,
      `/appeal/form-upload`,
      `/appeal/patient-details`,
      `/appeal/letter-details`,
      `/appeal/procedure-details`,
      `/appeal/additional-details`,
      `/appeal/summary`,
   ];

   const currentIndex = paths.findIndex(path => path.includes(keyword));
   const progressPercentage = ((currentIndex + 1) / paths.length) * 100;

   return (
      <div className="flex flex-row items-center p-4 w-7/12 mt-4 self-center mx-auto">

         <div className="w-full">
            <div className="h-2 bg-gray-200 rounded-full">
               <div
                  className="h-2 bg-blue-800 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
               ></div>
            </div>
         </div>

         <SaveButton />

      </div>

   );
}

export default ProgressBar