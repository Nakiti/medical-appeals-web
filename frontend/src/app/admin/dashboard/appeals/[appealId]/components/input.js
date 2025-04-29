const Input = ({ title, value }) => {
   return (
      <div className="space-y-1">
         <label className="block text-xs font-bold text-gray-800">{title}</label>
         <p className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 text-sm text-base text-gray-800 shadow-sm">
            {value}
         </p>
      </div>
   );
};

export default Input;
