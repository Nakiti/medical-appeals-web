"use client"
import { getSubmittedAppeals } from "@/app/services/fetchServices";
import AppealItem from "../components/appealItem";
import { useState, useEffect, useContext } from "react";
import Table from "./components/table";
import { AuthContext } from "@/app/context/authContext";
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
            console.log(err);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="p-8 w-full min-h-screen bg-gray-50">
         <div className="p-8 w-full min-h-screen bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Appeals</h2>
            <p className="text-gray-700 mb-6">
               The following table lists all appeals you have submitted.
            </p>

            <Searchbar setData={setAppeals} userId={currentUser} submitted={1} />
            {appeals && <Table data={appeals} />}
         </div>
      </div>
   );
};

export default Appeals;
