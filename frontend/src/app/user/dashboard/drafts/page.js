"use client";

import { getDrafts } from "@/app/services/fetchServices";
import DraftItem from "../components/draftItem";
import { useState, useEffect, useContext } from "react";
import { deleteDrafts } from "@/app/services/deleteServices";
import Table from "./components/table";
import { AuthContext } from "@/app/context/authContext";
import Searchbar from "../components/searchbar";
import { getAppealSearch } from "@/app/services/fetchServices";
import ConfirmModal from "../components/confirmModal";
import { FaTrash } from "react-icons/fa";

const Drafts = () => {
   const [drafts, setDrafts] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const { currentUser } = useContext(AuthContext);
   const [open, setOpen] = useState(false)
   const [message, setMessage] = useState("")

   const fetchData = async () => {
      try {
         const response = await getDrafts(currentUser);
         setDrafts(response);
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const toggleEdit = () => {
      setIsEditing(!isEditing);
   };

   const handleSelect = (id) => {
      setDrafts((prev) =>
         prev.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
         )
      );
   };

   const handleModalOpen = () => {
      setMessage("Are you sure you want to delete these drafts?")
      setOpen(true)
   }

   const handleDelete = async () => {
      const deleted = drafts.filter(item => item.selected === true);
      await deleteDrafts(deleted);
      await fetchData();
      setIsEditing(false);
   };


   return (
      <div className="md:p-8 w-full min-h-screen bg-gray-100">
         {open && <ConfirmModal isOpen={open} onConfirm={handleDelete} onClose={() => setOpen(false)} message={message}/>}
         <div className="p-8 w-full min-h-screen bg-white shadow-sm rounded-lg">
            <div className="flex flex-row justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-gray-800">My Drafts</h2>
               <div className="space-x-4">
                  {isEditing && (
                     <button
                        className="text-sm bg-red-600 px-6 py-2 rounded-lg text-white hover:bg-red-700 transition"
                        onClick={handleModalOpen}
                     >
                        <FaTrash />
                     </button>
                  )}
                  <button
                     className="text-sm bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition"
                     onClick={toggleEdit}
                  >
                     {isEditing ? "Cancel" : "Edit"}
                  </button>
               </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
               As we are evaluating your qualifications, we may contact you to provide additional information. In this case, you will receive a notification with instructions. Thank you for your interest in joining our team!
            </p>
            <Searchbar setData={setDrafts} submitted={0} searchFunc={getAppealSearch} userId={currentUser} />
            {drafts && (
               <Table
                  data={drafts}
                  userId={currentUser}
                  isEditing={isEditing}
                  handleSelect={handleSelect}
               />
            )}
         </div>
      </div>
   );
};

export default Drafts;
