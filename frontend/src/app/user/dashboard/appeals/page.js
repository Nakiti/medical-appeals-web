"use client";

import { useState, useEffect, useContext } from "react";
import { getSubmittedAppeals } from "@/app/services/fetchServices";
import { AuthContext } from "@/app/context/authContext";
import Table from "../components/table";
import Searchbar from "../components/searchbar";
import LoadingSpinner from "@/app/components/loadingSpinner";

const Appeals = () => {
   const [appeals, setAppeals] = useState(null);
   const { currentUser } = useContext(AuthContext);
   const columns = [
      { header: "ID", accessor: "id" },
      { header: "Claim Number", accessor: "claim_number" },
      {
         header: "Status",
         render: (item) => (
            <span
               className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  item.status === "Approved"
                     ? "bg-green-100 text-green-700"
                     : item.status === "Submitted"
                     ? "bg-blue-100 text-blue-600"
                     : item.status === "Under Review"
                     ? "bg-yellow-100 text-yellow-700"
                     : "bg-red-100 text-red-700"
               }`}
            >
               {item.status}
            </span>
         ),
      },
      {
         header: "Date Filed",
         render: (item) => new Date(item.date_filed).toLocaleDateString("en-US"),
      },
   ];

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

   if (!appeals) {
      return <LoadingSpinner />;
   }

   return (
      <div className="w-full min-h-screen bg-gray-50 md:p-8">
         <div className="w-full min-h-screen bg-white p-6 md:p-8 rounded-lg shadow-sm">
            {/* Header */}
            <div className="mb-6">
               <h2 className="text-2xl font-bold text-gray-800">My Appeals</h2>
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
            {appeals && <Table data={appeals} columns={columns}/>}
         </div>
      </div>
   );
};

export default Appeals;
