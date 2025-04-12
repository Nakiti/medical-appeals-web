"use client";

import { useState, useEffect, useContext } from "react";
import { getSubmittedAppeals } from "@/app/services/fetchServices";
import { AuthContext } from "@/app/context/authContext";

import Table from "./components/table";
import Searchbar from "../components/searchbar";

const Appeals = () => {
   const [appeals, setAppeals] = useState(null);
   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getSubmittedAppeals(currentUser);
            setAppeals(response);
         } catch (err) {
            console.error(err);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="w-full min-h-screen bg-gray-50 md:p-8">
         <div className="w-full min-h-screen bg-white p-6 md:p-8 rounded-lg shadow-sm">
            {/* Header */}
            <div className="mb-6">
               <h2 className="text-2xl font-bold text-gray-800">My Appeals</h2>
               <p className="text-gray-600 mt-2">
                  The following table lists all appeals you have submitted.
               </p>
            </div>

            {/* Search */}
            <div className="mb-6">
               <Searchbar
                  setData={setAppeals}
                  userId={currentUser}
                  submitted={1}
               />
            </div>

            {/* Table */}
            {appeals && <Table data={appeals} />}
         </div>
      </div>
   );
};

export default Appeals;
