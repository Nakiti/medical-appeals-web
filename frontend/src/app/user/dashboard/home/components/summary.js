import {
   FaFolderOpen,
   FaClock,
   FaCheckCircle,
   FaTimesCircle,
 } from "react-icons/fa";
 
 const SummaryBar = ({ data }) => {
   const stats = [
     {
       label: "Appeals Submitted",
       value: data.submittedCount,
       change: "-5%",
       icon: <FaCheckCircle className="text-green-500" />,
       color: "bg-red-50",
       changeColor: "text-red-500",
     },
     {
       label: "Drafts",
       value: data.draftCount,
       change: "+3",
       icon: <FaFolderOpen className="text-blue-500" />,
       color: "bg-blue-50",
       changeColor: "text-green-500",
     },
     {
       label: "Appeals Due Soon",
       value: data.dueSoonCount,
       change: "+2",
       icon: <FaClock className="text-yellow-500" />,
       color: "bg-yellow-50",
       changeColor: "text-green-500",
     },
   //   {
   //     label: "Appeals Approved",
   //     value: data.approvedCount,
   //     change: "+10",
   //     icon: <FaCheckCircle className="text-green-500" />,
   //     color: "bg-green-50",
   //     changeColor: "text-green-500",
   //   },
   ];
 
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-white rounded-xl py-4 shadow-sm">
         {stats.map((stat, idx) => (
            <div
            key={idx}
            className={`flex flex-col items-start p-5 ${
               idx !== 0 ? "border-l-2 border-slate-200" : ""
            }`}
            >
            <div className="flex items-center gap-3 mb-2">
               <div className="text-xl">{stat.icon}</div>
               <span className="text-sm font-medium text-gray-600">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            {/* <div className={`text-sm mt-1 ${stat.changeColor}`}>{stat.change}</div> */}
            </div>
         ))}
      </div>
   );
};
 
export default SummaryBar;
 