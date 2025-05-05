import Link from "next/link";

const NavigationButtons = ({ nextHref, backHref }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between mt-10 gap-4">
      {/* Back Button */}
      <Link
        href={backHref}
        className="flex-1 text-center rounded-full py-3 px-6 bg-gray-200 text-gray-700 font-medium text-base hover:bg-gray-300 transition duration-200 shadow-sm"
      >
        Back
      </Link>

      {/* Next Button */}
      <Link
        href={nextHref}
        className="flex-1 text-center rounded-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-base hover:opacity-90 transition duration-200 shadow-md"
      >
        Next
      </Link>
    </div>
  );
};

export default NavigationButtons;
