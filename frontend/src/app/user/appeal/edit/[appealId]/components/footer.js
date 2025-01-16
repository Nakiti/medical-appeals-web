import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { updateAppeal } from "@/app/services/updateServices";
import { useContext } from "react";
import { FormContext } from "@/app/context/formContext";

const Footer = ({appealId, userId}) => {
   const pathname = usePathname();
   const keyword = pathname.split("/")[5];
   const {inputs, documents} = useContext(FormContext)
   const router = useRouter()

   const paths = [
      `/user/appeal/edit/${appealId}/initial`,
      `/user/appeal/edit/${appealId}/patient-details`,
      `/user/appeal/edit/${appealId}/procedure-details`,
      `/user/appeal/edit/${appealId}/additional-details`,
      `/user/appeal/edit/${appealId}/supporting-documents`,
      `/user/appeal/edit/${appealId}/summary`,
   ];

   const currentIndex = paths.findIndex(path => path.includes(keyword));

   const handleSubmit = async() => {
      Object.entries(inputs).forEach(([key, value]) => {
         if (key != "dateFiled" && key != "submitted" && key != "status" && key != "additonalDetails") {
            if (/^\s*$/.test(value) || value == 0) {
               return
            }
         }
      })
      
      try {
         await updateAppeal(appealId, {
            ...inputs,
            dateFiled: (new Date()).toISOString().slice(0, 19).replace('T', ' '),
            submitted: 1,
            status: "Submitted"
         }, documents)
         router.push("/user/dashboard/home")
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className="fixed bottom-0 max-w-5xl w-full flex justify-end bg-white py-4 border-t border-gray-300">
         <div className="flex flex-row space-x-4 mr-8">
            {currentIndex > 0 && <Link 
               className="bg-gray-400 rounded-sm py-2 px-8 w-40 text-white text-center text-md"
               href={paths[Math.max(currentIndex - 1, 0)]}
            >
               Back
            </Link>}
            {currentIndex != 5 ?<Link 
               className="bg-blue-500 rounded-sm py-2 px-8 w-40 text-white text-center text-md"
               href={paths[Math.min(currentIndex + 1, paths.length - 1)]}
            >
               Continue
            </Link> :
            <button
               className="bg-blue-500 rounded-sm py-2 px-8 w-40 text-white text-center text-md"
               onClick={handleSubmit}
            >
               Submit
            </button>
            }
         </div>
      </div>
   )
}

export default Footer