import { AiOutlineFileText, AiOutlineHourglass, AiOutlineCheckCircle } from 'react-icons/ai';

const ProgressBar = ({ currentStatus }) => {
   const statuses = ["Submitted", "Under Review", "Decision Made"];
   const barColor = "bg-blue-500"; // Muted, professional blue
   const barBackgroundColor = "bg-gray-200"; // Light gray for background

   const currentStatusIndex = statuses.findIndex(status => status === currentStatus);
   const barWidthPercentage = ((currentStatusIndex + 1) / statuses.length) * 100;

   return (
      <div className="w-5/6 space-y-4 mx-auto">
         {/* Progress Bar */}
         <div className={`w-full h-3 rounded-full overflow-hidden ${barBackgroundColor}`}>
            <div
               className={`h-full ${barColor} transition-all`}
               style={{ width: `${barWidthPercentage}%` }}
            />
         </div>

         {/* Status Icons and Labels */}
         <div className="flex justify-between items-center">
            {statuses.map((status, index) => {
               const Icon = index === 0 ? AiOutlineFileText : index === 1 ? AiOutlineHourglass : AiOutlineCheckCircle;
               const isActive = index <= currentStatusIndex;
               return (
                  <div key={index} className="flex flex-col items-center w-1/3 text-center">
                     <Icon className={`text-2xl mb-1 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                     <p className={`text-sm ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                        {status}
                     </p>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default ProgressBar;
