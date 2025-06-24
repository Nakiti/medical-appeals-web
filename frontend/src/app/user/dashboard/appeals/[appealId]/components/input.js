import { useContext } from "react";
import { FormContext } from "@/app/context/formContext";

const FormInput = ({label, name, value, onChange, placeholder = "", type = "text", required = false}) => {
   const {status} = useContext(FormContext)

   return (
      <div className="flex flex-col">
         <label className="text-gray-600 text-sm font-semibold mb-1">
            {label} {required && <span className="text-red-500">*</span>}
         </label>
         <input
          type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            disabled={status == "submitted"}
         />
      </div>
   );
};

export default FormInput;
