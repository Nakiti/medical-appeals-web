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
      <div className="w-full md:w-full flex items-center border border-gray-200 rounded-lg shadow-sm bg-white">
         <input
            type="text"
            placeholder="Search for an Appeal"
            className="px-4 py-3 w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            value={query}
            onChange={handleInputsChange}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
                  handleSearch();
               }
            }}
         />
         <IoIosSearch
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-600 transition duration-200 mr-4"
            onClick={handleSearch}
         />
      </div>
   )
}

export default Searchbar