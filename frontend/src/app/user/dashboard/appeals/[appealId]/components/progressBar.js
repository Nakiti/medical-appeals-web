import { AiOutlineFileText, AiOutlineHourglass, AiOutlineCheckCircle } from 'react-icons/ai';

const ProgressBar = ({ currentStatus }) => {
  const statuses = ["Submitted", "Under Review", "Decision Made"];
  const currentStatusIndex = statuses.findIndex(status => status === currentStatus);
  const barWidthPercentage = ((currentStatusIndex + 1) / statuses.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Bar */}
      <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
          style={{ width: `${barWidthPercentage}%` }}
        />
      </div>

      {/* Icons & Labels */}
      <div className="flex justify-between items-center mt-1">
        {statuses.map((status, index) => {
          const Icon = index === 0 ? AiOutlineFileText : index === 1 ? AiOutlineHourglass : AiOutlineCheckCircle;
          const isActive = index <= currentStatusIndex;

          return (
            <div key={index} className="flex flex-col items-center w-1/3">
              <Icon className={`text-2xl mb-1 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-indigo-700" : "text-gray-500"}`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
