

const CustomInput = ({label, value, handleInputsChange, name, placeholder}) => {

   return (
      <div>
         <label className="block text-sm font-semibold text-gray-700">{label}</label>
         <input
            type=""
            className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleInputsChange}
         />
      </div>
   )
}

export default CustomInput