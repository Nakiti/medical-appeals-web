import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

const Deadlines = ({data}) => {

   return (
      <div className="flex flex-col space-y-4 w-full">
         <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mr-4 mb-2">Deadlines</h2>
         
            {data && data.map(item => (
               <Link 
                  href={`/user/dashboard/appeals/${item.id}/`}
                  key={item.id}
               >
                  <div className="border-b border-gray-300 mb-4 pb-2 hover:bg-gray-100 cursor-pointer">
                     <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700">{item.claim_number}</p>
                     </div>
                     <p className="text-xs text-gray-700">{new Date(item.appeal_deadline).toLocaleDateString("en-US")}</p>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}

export default Deadlines