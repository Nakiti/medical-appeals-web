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
      <div className="w-full md:w-full mb-2 flex items-center border border-gray-300 rounded-md shadow-sm">
         <input
            type="text"
            placeholder="Search for an Appeal"
            className="px-5 py-3 w-full text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:border-blue-500 transition-colors"
            value={query}
            onChange={handleInputsChange}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
               handleSearch();
               }
            }}
         />
         <IoIosSearch
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors mr-4"
            onClick={handleSearch}
         />
      </div>
   )
}

export default Searchbar