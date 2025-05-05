

const DefaultInput = ({label, value, handleInputsChange, name, placeholder}) => {

   return (
      <div className="w-full">
         <label className="text-sm font-bold mb-2 block">
            {label}
            <span className="text-red-500 ml-1">*</span>
         </label>
         <input 
            className="rounded-md border border-gray-600 shadow-sm py-2 px-4 w-full"
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleInputsChange}
         />
      </div>
   )
}

export default DefaultInput