import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ProgressBar = ({ userId, appealId }) => {
   const pathname = usePathname();
   const keyword = pathname.split("/")[5];

   const paths = [
      `/user/appeal/edit/${appealId}/initial`,
      `/user/appeal/edit/${appealId}/patient-details`,
      `/user/appeal/edit/${appealId}/procedure-details`,
      `/user/appeal/edit/${appealId}/additional-details`,
      `/user/appeal/edit/${appealId}/supporting-documents`,
      `/user/appeal/edit/${appealId}/summary`,
   ];

   const currentIndex = paths.findIndex(path => path.includes(keyword));
   const progressPercentage = ((currentIndex + 1) / paths.length) * 100;

   return (
      <div className="flex items-center justify-between p-4 w-5/6 self-center mx-auto">
         {/* <Link
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            href={paths[Math.max(currentIndex - 1, 0)]}
         >
            <FaArrowLeft />
         </Link> */}
         <div className="flex-1 mx-4">
            <div className="h-2 bg-gray-200 rounded">
               <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: `${progressPercentage}%` }}
               ></div>
            </div>
         </div>
         {/* <Link
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            href={paths[Math.min(currentIndex + 1, paths.length - 1)]}
         >
            <FaArrowRight />
         </Link> */}
      </div>
   );
};

export default ProgressBar;
