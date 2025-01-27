"use client";
import AppealItem from "../components/appealItem";
import DraftItem from "../components/draftItem";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { getAppealsByUser, getDrafts, getNotificationByUserId, getSubmittedAppeals, getUser } from "@/app/services/fetchServices";
import Link from "next/link";
import Modal from "./components/modal";
import { AuthContext } from "@/app/context/authContext";
import Table from "./components/table";
import Updates from "./components/updates";

const Home = ({}) => {
   const [drafts, setDrafts] = useState(null);
   const [appeals, setAppeals] = useState(null);
   const [updates, setUpdates] = useState(null)
   const [visible, setVisible] = useState(false);
   const [showUpdates, setShowUpdates] = useState(true);
   const [showDrafts, setShowDrafts] = useState(true);
   const [showAppeals, setShowAppeals] = useState(true);
   const { currentUser } = useContext(AuthContext);
   const [user, setUser] = useState(null);

   const appealColumns = [
      { title: "Id", value: "id" },
      { title: "Internal Name", value: "internal_name" },
      { title: "Claim Number", value: "claim_number" },
      { title: "Date Filed", value: "date_filed" },
      { title: "Status", value: "status" },
   ];

   const draftColumns = [
      { title: "Id", value: "id" },
      { title: "Internal Name", value: "internal_name" },
      { title: "Date Created", value: "created_at" },
      { title: "Status", value: "status" },
   ];

   useEffect(() => {
      const fetchData = async () => {
         try {
            const draftsResponse = await getDrafts(currentUser);
            setDrafts(draftsResponse);

            const appealsResponse = await getSubmittedAppeals(currentUser);
            setAppeals(appealsResponse);

            const userResponse = await getUser(currentUser);
            setUser(userResponse);

            const updatesResponse = await getNotificationByUserId(currentUser)
            setUpdates(updatesResponse)
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, [currentUser]);

   return (
      <div className="p-4 md:p-8 space-y-4">
         {visible && <Modal visible={visible} setVisible={setVisible} userId={currentUser} />}

         {user && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
               <div className="flex flex-col mb-6 md:mb-0">
                  <p className="text-sm font-semibold text-gray-600">Date</p>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                     Welcome, {user.first_name} {user.last_name}
                  </h1>
               </div>
               <button
                  onClick={() => setVisible(true)}
                  className="w-full md:w-1/4 h-14 md:h-16 bg-blue-500 font-semibold py-2 px-4 rounded-md text-white hover:bg-blue-700 transition ease-in-out duration-300"
               >
                  Create New Appeal
               </button>
            </div>
         )}

         <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-col space-y-4 w-full md:w-3/4">
               <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                     <Link href={`/user/dashboard/drafts`} className="flex items-center">
                        <h2 className="text-lg font-semibold text-gray-800 mr-4">Drafts</h2>
                        <FaArrowRight />
                     </Link>
                     <button onClick={() => setShowDrafts(!showDrafts)} className="text-sm text-blue-500">
                        {showDrafts ? "Hide" : "Show"}
                     </button>
                  </div>
                  {showDrafts && <Table columns={draftColumns} data={drafts} type="draft"/>}
               </div>

               <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                     <Link href={`/user/dashboard/appeals`} className="flex items-center">
                        <h2 className="text-lg font-semibold text-gray-800 mr-4">Submitted Appeals</h2>
                        <FaArrowRight />
                     </Link>
                     <button onClick={() => setShowAppeals(!showAppeals)} className="text-sm text-blue-500">
                        {showAppeals ? "Hide" : "Show"}
                     </button>
                  </div>
                  {showAppeals && <Table columns={appealColumns} data={appeals} type="appeal"/>}
               </div>
            </div>

            <Updates data={updates}/>
         </div>
      </div>
   );
};

export default Home;
