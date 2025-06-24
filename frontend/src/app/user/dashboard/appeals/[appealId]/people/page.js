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
    <div className="p-10 bg-gradient-to-b from-white via-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg px-8 py-10 space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">Doctor References</h1>
          <p className="text-sm text-gray-500">
            Save doctors and supporting documentation related to your case.
          </p>
        </div>

        {/* Add Doctor Form */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Add New Reference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Doctor's Name"
              className="w-full border-b border-slate-400 bg-transparent focus:outline-none focus:border-indigo-500 text-sm px-1 py-2"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border-b border-slate-400 bg-transparent focus:outline-none focus:border-indigo-500 text-sm px-1 py-2"
            />
            <input
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              placeholder="Specialty"
              className="w-full border-b border-slate-400 bg-transparent focus:outline-none focus:border-indigo-500 text-sm px-1 py-2"
            />
          </div>
          <button
            onClick={handleAddDoctor}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-md border border-indigo-400 text-indigo-700 hover:bg-indigo-50 transition"
          >
            <FiPlus size={16} />
            Add Doctor
          </button>
        </div>

        {/* Existing Doctors */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Existing References</h2>
          {doctors.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No references added yet.</p>
          ) : (
            doctors.map((doc) => (
              <div key={doc.id} className="p-5 border border-slate-200 bg-slate-50 rounded-md">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-base font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-sm text-slate-600">{doc.specialty || "No specialty listed"}</p>
                    <p className="text-sm text-slate-500">{doc.email}</p>
                  </div>
                </div>

                {/* Documents */}
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Uploaded Documents</h4>
                  <ul className="space-y-1">
                    {doc.documents.map((file, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600 gap-2 border-b border-dashed border-slate-300 py-1"
                      >
                        <FiFileText size={16} />
                        {file.name}
                        <span className="ml-auto text-xs text-gray-400">
                          Uploaded: {file.uploadedAt}
                        </span>
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
