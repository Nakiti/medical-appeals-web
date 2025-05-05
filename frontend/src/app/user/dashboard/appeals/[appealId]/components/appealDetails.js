import { FiEdit } from "react-icons/fi";

const AppealDetails = ({ inputs, isDraft, handleDetailsEdit }) => {
  return (
    <section className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Appeal Details</h3>
        {isDraft && (
          <button
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition"
            onClick={handleDetailsEdit}
            aria-label="Edit Details"
          >
            <FiEdit size={18} />
            Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key} className="text-sm space-y-1">
            <p className="text-gray-500 font-medium capitalize tracking-wide">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
            <p className="text-gray-800 font-medium">
              {value || <span className="text-gray-400 italic">Not provided</span>}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppealDetails;
