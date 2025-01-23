"use client";

import { getSubmittedAppeals } from "@/app/services/fetchServices";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import Table from "./components/table";
import Searchbar from "../components/searchbar";
import Filters from "../components/filters";

const Appeals = () => {
   const [appeals, setAppeals] = useState(null);
   const { currentUser } = useContext(AuthContext);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768); // Mobile if screen width is 768px or less
      };

      // Set initial value
      handleResize();

      // Add event listener to handle screen resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getSubmittedAppeals(currentUser);
            setAppeals(response);
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="p-8 w-full min-h-screen bg-gray-50">
         {/* Title outside white padding area */}
         <h2 className="text-3xl font-bold text-gray-800 mb-2">Appeals</h2>
         <p className="text-gray-700 mb-6">
            The following table lists all appeals you have submitted.
         </p>

         {/* White box for search bar */}
         <div className="mb-4 p-6 bg-white shadow-md rounded-lg space-y-4">
            <Searchbar setData={setAppeals} userId={currentUser} submitted={1} />
            {!isMobile && <Filters />} {/* Show filters only if not on mobile */}
         </div>

         {/* White box for table */}
         <div className="p-6 bg-white shadow-md rounded-lg">
            {appeals && <Table data={appeals} />}
         </div>
      </div>
   );
};

export default Appeals;
