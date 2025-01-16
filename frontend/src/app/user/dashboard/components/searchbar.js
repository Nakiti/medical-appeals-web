import { useState } from "react"
import debounce from "lodash/debounce"
import { IoIosSearch } from "react-icons/io";
import { getAppealSearch } from "@/app/services/fetchServices";

/*
   Component: Searchbar
   Description: Searchbar to find campaigns by title
   Props:
      setData: change the campaign data displayed
      organizationId: id of the organization
*/
const Searchbar = ({setData, submitted, userId, searchFunc}) => {
   const [query, setQuery] = useState("")

   /*
      Description: handle change of the query input
   */
   const handleInputsChange = async (e) => {
      setQuery(e.target.value)
      debouncedSearch(e.target.value)
   }

   /*
      Description: debounced search to search campaigns after every user key press (300ms delay)
   */
   const debouncedSearch = debounce(async (query) => {
      try {
         const response = await getAppealSearch(query, submitted, userId);
         setData(response)
      } catch (err) {
         console.error(err);
      }
   }, 300);

   /*
      Description: retrieves campaigns that matched query
   */
   const handleSearch = async() => {
      try {
         const response = await getAppealSearch(query, submitted, userId)
         setData(response)
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className="relative w-3/4 mb-2">
         <input
            type="text"
            placeholder="Search for an Appeal"
            className="px-5 py-3 pr-12 w-full text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 transition-colors"
            value={query}
            onChange={handleInputsChange}
            onKeyDown={(e) => {
               if (e.key === "Enter") {
               handleSearch();
               }
            }}
         />
         <IoIosSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleSearch}
         />
      </div>
   )
}

export default Searchbar