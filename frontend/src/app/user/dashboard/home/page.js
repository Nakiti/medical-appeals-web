"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import LoadingSpinner from "@/app/components/loadingSpinner";
import {
   getAppealsByUser,
   getDrafts,
   getNotificationByUserId,
   getSubmittedAppeals,
   getUser
} from "@/app/services/fetchServices";

import { AuthContext } from "@/app/context/authContext";
import Table from "./components/table";
import Updates from "./components/updates";
import Modal from "./components/modal";
import Deadlines from "./components/deadlines";
import SummaryBar from "./components/summary";

const Home = () => {
   const router = useRouter();
   const { currentUser, loading } = useContext(AuthContext);

   const [user, setUser] = useState(null);
   const [drafts, setDrafts] = useState(null);
   const [appeals, setAppeals] = useState(null);
   const [updates, setUpdates] = useState(null);
   const [visible, setVisible] = useState(false);
   const [showDrafts, setShowDrafts] = useState(true);
   const [showAppeals, setShowAppeals] = useState(true);

   const appealColumns = [
      { title: "Id", value: "id" },
      { title: "Claim Number", value: "claim_number" },
      { title: "Date Filed", value: "date_filed" },
      { title: "Status", value: "status" },
   ];

   const draftColumns = [
      { title: "Id", value: "id" },
      { title: "Claim Number", value: "claim_number" },
      { title: "Date Created", value: "created_at" },
      { title: "Appeal Deadline", value: "appeal_deadline" },
   ];

   useEffect(() => {
      if (!loading && currentUser) {
         const fetchData = async () => {
            try {
               const [draftsData, appealsData, userData, updatesData] = await Promise.all([
                  getDrafts(currentUser),
                  getSubmittedAppeals(currentUser),
                  getUser(currentUser),
                  getNotificationByUserId(currentUser)
               ]);
   
               setDrafts(draftsData);
               setAppeals(appealsData);
               setUser(userData);
               setUpdates(updatesData);
            } catch (err) {
               console.error("Error fetching data:", err);
            }
         };
   
         fetchData();
      }
   }, [loading, currentUser]);

   if (loading || !user || !drafts || !appeals || !updates) {
      return <LoadingSpinner />;
   }

   return (
      <div className="p-4 md:p-8 space-y-6">
         {visible && <Modal visible={visible} setVisible={setVisible} userId={currentUser} />}

         {/* Header */}
         {user && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
               <div>
                  <p className="text-md text-gray-600">Hello,</p>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                     {user.first_name} {user.last_name}
                  </h1>
               </div>
               <button
                  onClick={() => router.push("/appeal/new/claim-number")}
                  className="w-full md:w-auto mt-4 md:mt-0 h-16 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 rounded-md transition"
               >
                  <span className="inline-flex items-center gap-2">
                     <FaPlus className="text-sm" />
                     Create New Appeal
                  </span>
               </button>
            </div>
         )}

         <SummaryBar />

         <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col space-y-6 w-full md:w-3/4">
               <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                     <Link href="/user/dashboard/drafts" className="flex items-center gap-2 text-gray-800 font-semibold text-lg hover:text-blue-600">
                        Drafts <FaArrowRight className="text-sm" />
                     </Link>
                     <button
                        onClick={() => setShowDrafts(!showDrafts)}
                        className="text-sm text-blue-500 hover:underline"
                     >
                        {showDrafts ? "Hide" : "Show"}
                     </button>
                  </div>
                  {showDrafts && <Table columns={draftColumns} data={drafts} type="draft" />}
               </div>

               {/* Submitted Appeals */}
               <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                     <Link href="/user/dashboard/appeals" className="flex items-center gap-2 text-gray-800 font-semibold text-lg hover:text-blue-600">
                        Submitted Appeals <FaArrowRight className="text-sm" />
                     </Link>
                     <button
                        onClick={() => setShowAppeals(!showAppeals)}
                        className="text-sm text-blue-500 hover:underline"
                     >
                        {showAppeals ? "Hide" : "Show"}
                     </button>
                  </div>
                  {showAppeals && <Table columns={appealColumns} data={appeals} type="appeal" />}
               </div>
            </div>

            <div className="w-1/4 flex flex-col space-y-6">
               <Updates data={updates} />
               <Deadlines data={updates} />
            </div>
         </div>
      </div>
   );
};

export default Home;
