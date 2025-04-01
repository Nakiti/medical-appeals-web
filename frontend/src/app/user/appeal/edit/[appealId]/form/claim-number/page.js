const ClaimNumber = () => {

   
   return (
      <div className="flex flex-col justify-center items-center min-h-[200px]">
         <p className="font-bold text-3xl mb-4 text-gray-800">Enter Claim Number:</p>

         <input
            className="px-5 py-3 rounded-lg bg-gray-100 text-lg w-full max-w-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="#:"
         />
      </div>
   )
}

export default ClaimNumber
