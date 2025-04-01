import Link from "next/link";

const NavigationButtons = ({ nextHref, backHref }) => {
   return (
      <div className="w-full flex justify-between mt-8">
         <Link 
            className="w-1/2 text-center rounded-full py-4 px-10 bg-gray-500 text-white font-bold text-lg hover:bg-gray-600 transition duration-200 shadow-md mr-2"
            href={backHref}
         >
            Back
         </Link>

         <Link 
            className="w-1/2 text-center rounded-full py-4 px-10 bg-blue-800 text-white font-bold text-lg hover:bg-blue-900 transition duration-200 shadow-md ml-2"
            href={nextHref}
         >
            Next
         </Link>
      </div>
   );
};

export default NavigationButtons;
