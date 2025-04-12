"use client";

import { useState, useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";

import { getDrafts, getAppealSearch } from "@/app/services/fetchServices";
import { deleteDrafts } from "@/app/services/deleteServices";

import { AuthContext } from "@/app/context/authContext";
import Table from "./components/table";
import Searchbar from "../components/searchbar";
import ConfirmModal from "../components/confirmModal";

const Drafts = () => {
   const [drafts, setDrafts] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const { currentUser } = useContext(AuthContext);
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState("");

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const response = await getDrafts(currentUser);
         setDrafts(response);
      } catch (err) {
         console.error(err);
      }
   };

   const toggleEdit = () => setIsEditing((prev) => !prev);

   const handleSelect = (id) => {
      setDrafts((prev) =>
         prev.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
         )
      );
   };

   const handleModalOpen = () => {
      setMessage("Are you sure you want to delete these drafts?");
      setOpen(true);
   };

   const handleDelete = async () => {
      const selected = drafts.filter((item) => item.selected);
      await deleteDrafts(selected);
      await fetchData();
      setIsEditing(false);
   };

   return (
      <div className="w-full min-h-screen bg-gray-100 md:p-8">
         {open && (
            <ConfirmModal
               isOpen={open}
               onConfirm={handleDelete}
               onClose={() => setOpen(false)}
               message={message}
            />
         )}

         <div className="w-full min-h-screen bg-white p-6 md:p-8 rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-2xl font-bold text-gray-800">My Drafts</h2>
               <div className="flex items-center space-x-3">
                  {isEditing && (
                     <button
                        onClick={handleModalOpen}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                        title="Delete Selected"
                     >
                        <FaTrash className="w-4 h-4" />
                     </button>
                  )}
                  <button
                     onClick={toggleEdit}
                     className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg transition"
                  >
                     {isEditing ? "Cancel" : "Edit"}
                  </button>
               </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
               As we are evaluating your qualifications, we may contact you to provide additional information. In this case, you will receive a notification with instructions. Thank you for your interest in joining our team!
            </p>

            {/* Searchbar */}
            <div className="mb-6">
               <Searchbar
                  setData={setDrafts}
                  submitted={0}
                  searchFunc={getAppealSearch}
                  userId={currentUser}
               />
            </div>

            {/* Table */}
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
