"use client";
import { useState } from "react";
import { FiPlus, FiFileText } from "react-icons/fi";

const PeoplePage = () => {
   const [doctors, setDoctors] = useState([]);
   const [form, setForm] = useState({ name: "", email: "", specialty: "" });

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleAddDoctor = () => {
      if (form.name && form.email) {
         const newDoctor = {
            ...form,
            id: Date.now(),
            documents: [
               { name: "Referral Letter.pdf", uploadedAt: "2024-04-25" },
               { name: "Diagnosis Notes.docx", uploadedAt: "2024-04-22" },
            ],
         };
         setDoctors([newDoctor, ...doctors]);
         setForm({ name: "", email: "", specialty: "" });
      }
   };

   return (
      <div className="p-8 bg-gray-50 min-h-screen">
         <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Doctor References</h1>

            {/* Add Doctor Form */}
            <div className="space-y-4 mb-10">
               <h2 className="text-lg font-medium text-gray-700">Add New Reference</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                     placeholder="Doctor's Name"
                  />
                  <input
                     name="email"
                     value={form.email}
                     onChange={handleChange}
                     className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                     placeholder="Email"
                  />
                  <input
                     name="specialty"
                     value={form.specialty}
                     onChange={handleChange}
                     className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                     placeholder="Specialty"
                  />
               </div>
               <button
                  onClick={handleAddDoctor}
                  className="flex items-center gap-2 mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition"
               >
                  <FiPlus size={16} />
                  Add Doctor
               </button>
            </div>

            {/* Existing Doctors */}
            <div className="space-y-6">
               <h2 className="text-lg font-medium text-gray-700">Existing References</h2>
               {doctors.length === 0 ? (
                  <p className="text-sm text-gray-500">No references added yet.</p>
               ) : (
                  doctors.map((doc) => (
                     <div key={doc.id} className="border rounded-md p-4 bg-gray-50">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-base font-semibold text-gray-800">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.specialty || "No specialty listed"}</p>
                              <p className="text-sm text-gray-500">{doc.email}</p>
                           </div>
                        </div>

                        {/* Documents */}
                        <div className="mt-4">
                           <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents</h4>
                           <ul className="space-y-2">
                              {doc.documents.map((file, idx) => (
                                 <li key={idx} className="flex items-center text-sm text-gray-600 gap-2">
                                    <FiFileText size={16} />
                                    {file.name}
                                    <span className="ml-auto text-xs text-gray-400">Uploaded: {file.uploadedAt}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
      </div>
   );
};

export default PeoplePage;
