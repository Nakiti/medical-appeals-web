import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"

const Updates = ({data}) => {


   return (
      <div className="flex flex-col space-y-4 w-full md:w-1/4">
         <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
            <Link href={`/user/dashboard/updates`} className="flex items-center mb-4">
               <h2 className="text-lg font-semibold text-gray-800 mr-4 ">Updates</h2>
               <FaArrowRight />
            </Link>
         
            {data && data.map(item => (
               <div className="border-b border-gray-300 mb-4 pb-2">
                  <div className="flex items-center justify-between">
                     <p className="text-sm text-gray-700">{item.title}</p>
                     <p className="text-sm font-medium text-gray-800">Appeal Internal Name</p>
                  </div>
                  <p className="text-xs text-gray-700 mt-2">{item.text}</p>
               </div>

            ))}
         </div>
      </div>
   )
}

export default Updates