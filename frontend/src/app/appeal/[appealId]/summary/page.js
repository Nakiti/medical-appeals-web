"use client";
import { updateAppeal } from "@/app/services/updateServices";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/authContext";
import { createAppeal, createBatchFiles } from "@/app/services/createServices";
import { FormContext } from "@/app/context/formContext";
import Link from "next/link";
import DocumentDisplay from "../../components/documentDisplay";
import { writeAppealLetter } from "@/app/services/gptServices";

const Summary = () => {
   const router = useRouter();
   const { currentUser } = useContext(AuthContext);
   const { inputs, appealId, documents, setAppealLetter } = useContext(FormContext);
   const [error, setError] = useState("");

   const sections = [
      { title: "Patient Details", fields: ["firstName", "lastName", "dob", "ssn"] },
      { title: "Letter Details", fields: ["insuranceProvider", "insuranceAddress", "physicianName", "physicianPhone", "physicianAddress", "physicianEmail"] },
      { title: "Procedure Details", fields: ["claimNumber", "procedureName", "denialReason"] },
      { title: "Additional Details", fields: ["additionalDetails"] },
   ];

   const handleSubmit = async () => {
      let missingFields = [];

      // Object.entries(inputs).forEach(([key, value]) => {
      //    if (!["dateFiled", "submitted", "status", "additionalDetails"].includes(key)) {
      //       if (/^\s*$/.test(value) || value === 0) {
      //          missingFields.push(key);
      //       }
      //    }
      // });

      // if (missingFields.length > 0) {
      //    setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
      //    return;
      // }

      try {
         const appealData = {
            userId: currentUser,
            ...inputs,
            // dateFiled: new Date().toISOString().slice(0, 19).replace("T", " "),
            submitted: 0,
            status: "Ready to Submit",
         };

         if (appealId !== "new") {
            await updateAppeal(appealId, appealData, documents);
            await createBatchFiles(appealId, documents.map(item => item.file));
         } else {
            const newAppealId = await createAppeal(appealData, documents);
            await createBatchFiles(newAppealId, documents.map(item => item.file));
         }
         const letterResponse = await writeAppealLetter(inputs)

         setAppealLetter(letterResponse)
         router.push(`/appeal/${appealId}/review`);
      } catch (err) {
         console.error("Error submitting appeal:", err);
         setError("An error occurred. Please try again.");
      }
   };

   return (
      <div className="w-full flex items-center justify-center px-4 py-8">
         <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Summary</h2>

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            {sections.map(({ title, fields }) => (
               <div key={title} className="mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">{title}</h3>
                  <ul className="space-y-2">
                     {fields.map((field) => (
                        <li key={field} className="flex justify-between border-b pb-2 text-sm sm:text-base">
                           <span className="font-medium">{field.replace(/([A-Z])/g, ' $1').trim()}:</span>
                           <span>{inputs[field] || "N/A"}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}

            {documents && documents.map((item, index) => (
               <DocumentDisplay item={item} key={index} />
            ))}

            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 mt-6">
               <Link
                  className="w-full sm:w-1/2 text-center rounded-full py-3 bg-gray-600 text-white font-bold text-base sm:text-lg hover:bg-gray-700 transition duration-200"
                  href={`/appeal/${appealId}/additional-details`}
               >
                  Previous
               </Link>

               <button
                  onClick={handleSubmit}
                  className="w-full sm:w-1/2 rounded-full py-3 bg-blue-800 text-white font-bold text-base sm:text-lg hover:bg-blue-900 transition duration-200"
               >
                  Create Appeal
               </button>
            </div>
         </div>
      </div>
   );
};

export default Summary;
