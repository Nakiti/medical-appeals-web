import { FaFolderOpen, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SummaryBar = ({data}) => {
   const stats = [
      { label: "Appeals Submitted", value: data.submittedCount, icon: <FaTimesCircle className="text-red-500 w-6 h-6" /> },
      { label: "Drafts", value: data.draftCount, icon: <FaFolderOpen className="text-blue-500 w-6 h-6" /> },
      { label: "Appeals Due Soon", value: data.dueSoonCount, icon: <FaClock className="text-yellow-500 w-6 h-6" /> },
      { label: "Appeals Approved", value: data.approvedCount, icon: <FaCheckCircle className="text-green-500 w-6 h-6" /> },
   ];

   console.log(stats[0])

   return (
      <div className="flex gap-6 mb-8">
         {stats.map((stat, index) => (
            <div
               key={index}
               className="flex flex-1 items-center p-8 shadow-sm rounded-lg bg-white"
            >
               {/* <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                  {stat.icon}
               </div> */}
               <div className="text-left">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default SummaryBar;
