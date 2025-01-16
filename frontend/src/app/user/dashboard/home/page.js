"use client";
import AppealItem from "../components/appealItem";
import DraftItem from "../components/draftItem";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { getAppealsByUser, getDrafts, getSubmittedAppeals, getUser } from "@/app/services/fetchServices";
import Link from "next/link";
import Modal from "./components/modal";
import { AuthContext } from "@/app/context/authContext";

const updates = [
   {
     claimNumber: '12345',
     internalName: 'Internal Claim Name',
     title: 'Update Title 1',
     description: 'This is the description for update 1.',
     date: '2025-01-13',
   },
   {
     claimNumber: '67890',
     internalName: 'Another Claim Name',
     title: 'Update Title 2',
     description: 'This is the description for update 2.',
     date: '2025-01-12',
   },
];

const Home = ({}) => {
   const [drafts, setDrafts] = useState(null);
   const [appeals, setAppeals] = useState(null);
   const [visible, setVisible] = useState(false);
   const [showUpdates, setShowUpdates] = useState(true);
   const [showDrafts, setShowDrafts] = useState(true);
   const [showAppeals, setShowAppeals] = useState(true);
   const { currentUser } = useContext(AuthContext);
   const [user, setUser] = useState(null)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const draftsResponse = await getDrafts(currentUser);
            setDrafts(draftsResponse);

            const appealsResponse = await getSubmittedAppeals(currentUser);
            setAppeals(appealsResponse);

            const userResponse = await getUser(currentUser)
            setUser(userResponse)
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, [currentUser]);

   return (
      <div className="p-8 space-y-4">
         {visible && <Modal visible={visible} setVisible={setVisible} userId={currentUser} />}

         {user && <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800 mb-4 md:mb-0">Welcome {user.first_name} {user.last_name}</h1>
            <button onClick={() => setVisible(true)} className="bg-blue-800 font-semibold py-4 px-8 w-full md:w-1/4 rounded-md text-md text-white hover:bg-blue-700 transition ease-in-out duration-300">
               Create New Appeal
            </button>
         </div>}

         {/* Drafts Section */}
         <div className="bg-white rounded-md p-8">
            <div className="flex items-center justify-between mb-6">
               <Link href={`/user/dashboard/drafts`} className="flex items-center">
                  <h2 className="text-xl font-semibold text-gray-700 mr-4">Drafts</h2>
                  <FaArrowRight />
               </Link>
               <button onClick={() => setShowDrafts(!showDrafts)} className="text-blue-500">
                  {showDrafts ? "Hide" : "Show"}
               </button>
            </div>
            {showDrafts && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drafts && drafts.slice(0, 3).map(item => (
                     <div key={item.id}>
                        <DraftItem draft={item} />
                     </div>
                  ))}
               </div>
            )}
         </div>

         {/* Appeals Section */}
         <div className="bg-white rounded-md p-8">
            <div className="flex items-center justify-between mb-6">
               <Link href={`/user/dashboard/appeals`} className="flex items-center">
                  <h2 className="text-xl font-semibold text-gray-700 mr-4">Appeals</h2>
                  <FaArrowRight />
               </Link>
               <button onClick={() => setShowAppeals(!showAppeals)} className="text-blue-500">
                  {showAppeals ? "Hide" : "Show"}
               </button>
            </div>
            {showAppeals && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {appeals && appeals.slice(0, 3).map(item => (
                     <div key={item.id}>
                        <AppealItem appeal={item} />
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

export default Home;
