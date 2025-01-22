

const Input = ({title, value}) => {

   return (
      <div className="">
         <label className="block text-sm font-semibold text-gray-600 mb-1">{title}</label>
         <p className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800">{value}</p>
      </div>
   )
}

export default Input