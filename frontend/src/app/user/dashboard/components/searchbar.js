import { useState } from "react"
import debounce from "lodash/debounce"
import { IoIosSearch } from "react-icons/io";
import { getAppealSearch } from "@/app/services/fetchServices";

const Searchbar = ({setData, submitted, userId, searchFunc}) => {
   const [query, setQuery] = useState("")

   const handleInputsChange = async (e) => {
      setQuery(e.target.value)
      debouncedSearch(e.target.value)
   }

   const debouncedSearch = debounce(async (query) => {
      try {
         const response = await getAppealSearch(query, submitted, userId);
         setData(response)
      } catch (err) {
         console.error(err);
      }
   }, 300);

   const handleSearch = async() => {
      try {
         const response = await getAppealSearch(query, submitted, userId)
         setData(response)
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className="w-full flex items-center gap-2 border border-gray-200 rounded-lg shadow-sm bg-white px-4 py-2">
         <input
            type="text"
            placeholder="Search for an Appeal"
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={query}
            onChange={handleInputsChange}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
                  handleSearch();
               }
            }}
         />
         <IoIosSearch
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 transition duration-200"
            onClick={handleSearch}
         />
      </div>
   );
   
}

export default Searchbar