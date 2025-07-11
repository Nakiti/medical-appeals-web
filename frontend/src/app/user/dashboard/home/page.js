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
   const [summaryData, setSummaryData] = useState(null)

   const appealColumns = [
      { title: "Id", value: "id" },
      { title: "Claim Number", value: "claim_number" },
      { title: "Date Created", value: "created_at" },
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
                  getAppealsByUser(currentUser),
                  getUser(currentUser),
                  getNotificationByUserId(currentUser)
               ]);
               
               setDrafts(draftsData);
               console.log(draftsData, appealsData)
               setAppeals(appealsData);
               setUser(userData);
               setUpdates(updatesData);

               setSummaryData({
                  submittedCount: Array.isArray(appealsData)
                     ? appealsData.filter(a => a.submitted === 1).length : 0,                  
                  draftCount: Array.isArray(draftsData) ? draftsData.length : 0,
                  dueSoonCount: Array.isArray(draftsData)
                    ? draftsData.filter(item => {
                        const d = new Date(item.appeal_deadline), n = new Date();
                        return d > n && d <= new Date(n.getTime() + 14 * 24 * 60 * 60 * 1000);
                      }).length
                    : 0,
                  approvedCount: Array.isArray(appealsData)
                    ? appealsData.filter(item => item.status === "Approved").length
                    : 0
               });
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
      <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-slate-100 p-4 md:p-8 space-y-8">
         {visible && <Modal visible={visible} setVisible={setVisible} userId={currentUser} />}

         {/* Header */}
         {user && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
               <p className="text-sm text-gray-500">Welcome back,</p>
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {user.first_name} {user.last_name}
               </h1>
            </div>
            <button
               onClick={() => router.push("/appeal/new/claim-number")}
               className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition"
            >
               <FaPlus className="text-sm" />
               Create New Appeal
            </button>
            </div>
         )}

         {/* Summary Bar */}
         {summaryData && <SummaryBar data={summaryData} />}

         {/* Main Content */}
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Tables */}
            <div className="flex flex-col space-y-8 w-full lg:w-3/4">
            {/* Drafts */}
            {/* <div className="bg-white rounded-xl shadow-sm p-6">
               <div className="flex justify-between items-center mb-4">
                  <Link
                  href="/user/dashboard/drafts"
                  className="text-lg font-semibold text-gray-800 hover:text-indigo-600 flex items-center gap-2"
                  >
                  Drafts <FaArrowRight className="text-sm" />
                  </Link>
                  <button
                  onClick={() => setShowDrafts(!showDrafts)}
                  className="text-sm text-indigo-500 hover:underline"
                  >
                  {showDrafts ? "Hide" : "Show"}
                  </button>
               </div>
               {showDrafts && <Table columns={draftColumns} data={drafts} type="draft" />}
            </div> */}

            {/* Submitted Appeals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
               <div className="flex justify-between items-center mb-4">
                  <Link
                  href="/user/dashboard/appeals"
                  className="text-lg font-semibold text-gray-800 hover:text-indigo-600 flex items-center gap-2"
                  >
                  Recent Appeals <FaArrowRight className="text-sm" />
                  </Link>
                  {/* <button
                  onClick={() => setShowAppeals(!showAppeals)}
                  className="text-sm text-indigo-500 hover:underline"
                  >
                  {showAppeals ? "Hide" : "Show"}
                  </button> */}
               </div>
               {showAppeals && <Table columns={appealColumns} data={appeals} type="appeal" />}
            </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/4 flex flex-col space-y-8">
            {/* <Updates data={updates} /> */}
            <Deadlines data={drafts} />
            </div>
         </div>
      </div>
   );

    
};

export default Home;
