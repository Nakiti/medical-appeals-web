import { FiEdit } from "react-icons/fi";
import { useState, useMemo } from "react";

const fieldConfig = {
  firstName: { label: "Patient First Name", type: "text" },
  lastName: { label: "Patient Last Name", type: "text" },
  dob: { label: "Date of Birth", type: "date" },
  insuranceProvider: { label: "Insurance Provider", type: "text" },
  insuranceAddress: { label: "Insurance Address", type: "text" },
  physicianName: { label: "Physician Name", type: "text" },
  physicianPhone: { label: "Physician Phone", type: "text" },
  physicianAddress: { label: "Physician Address", type: "text" },
  physicianEmail: { label: "Physician Email", type: "email" },
  policyNumber: { label: "Policy Number", type: "text" },
  procedureName: { label: "Procedure Name", type: "text" },
  denialReason: { label: "Denial Reason", type: "textarea" },
  additionalDetails: { label: "Additional Details", type: "textarea" },
  appealerAddress: {label: "Appealer Address", type: "text"},
  appealerFirstName: {label: "Appealer First Name", type: "text"},
  appealerLastName: {label: "Appealer Last Name", type: "text"},
  appealerPhoneNumber: {label: "Appealer Phone Number", type: "text"},
  appealerRelation: {label: "Appealer Relation", type: "text"},
};

const AppealDetails = ({ rawData, isDraft, onChange, isEditing }) => {

  const structuredInputs = useMemo(() => {
    return Object.entries(rawData).reduce((acc, [key, value]) => {
      const config = fieldConfig[key] || { label: key, type: "text" };
      acc[key] = {
        label: config.label,
        type: config.type,
        value
      };
      return acc;
    }, {});
  }, [rawData]);

  const handleChange = (key, value) => {
    if (onChange) {
      onChange(key, value);
    }
  };

  const renderInputField = (key, config) => {
    const commonProps = {
      id: key,
      name: key,
      value: config.value || "",
      onChange: (e) => handleChange(key, e.target.value),
      className:
      "w-full border-0 border-b border-gray-300 focus:border-indigo-500 focus:outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent py-.5"
    };

    switch (config.type) {
      case "textarea":
        return <textarea {...commonProps} rows={3} />;
      case "date":
        return <input type="date" {...commonProps} />;
      case "email":
        return <input type="email" {...commonProps} />;
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <section className="px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
        {Object.entries(structuredInputs).map(([key, config]) => (
          <div key={key} className="">
            <label
              htmlFor={key}
              className="text-gray-500 font-medium capitalize tracking-wide block text-xs"
            >
              {config.label}
            </label>
            {isEditing ? (
              renderInputField(key, config)
            ) : (
              <p className="text-gray-800 font-medium text-sm">
                {config.value || (
                  <span className="text-gray-400 italic">Not provided</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppealDetails;
