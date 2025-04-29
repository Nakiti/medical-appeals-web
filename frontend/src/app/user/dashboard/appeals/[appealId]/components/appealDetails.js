import { FiEdit } from "react-icons/fi";

const AppealDetails = ({inputs, isDraft, handleDetailsEdit}) => {

   return (
      <section className='px-6 py-6'>
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Details</h3>
            {isDraft && <button
               className="text-gray-500 hover:text-indigo-600 transition"
               onClick={handleDetailsEdit}
               aria-label="Edit Details"
            >
               <FiEdit size={18} />
            </button>}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {Object.entries(inputs).map(([key, value]) => (
               <div key={key} className="text-sm">
               <p className="text-gray-500 font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
               </p>
               <p className="text-gray-800 mt-1">{value || <span className="text-gray-400">—</span>}</p>
               </div>
            ))}
         </div>
      </section>
   )
}

export default AppealDetails