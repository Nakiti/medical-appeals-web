"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/authContext";
import { FormContext } from "@/app/context/formContext";
import Link from "next/link";
import DocumentDisplay from "../../components/documentDisplay";
import { writeAppealLetter } from "@/app/services/gptServices";
import SummaryItem from "../../components/summary";

const Summary = () => {
   const router = useRouter();
   const { currentUser } = useContext(AuthContext);
   const { inputs, appealId, documents, setAppealLetter, setAppealLetterUrl } = useContext(FormContext);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const sections = [
      { title: "Patient Details", fields: ["firstName", "lastName", "dob", "ssn"] },
      { title: "Letter Details", fields: ["insuranceProvider", "insuranceAddress", "physicianName", "physicianPhone", "physicianAddress", "physicianEmail"] },
      { title: "Procedure Details", fields: ["claimNumber", "procedureName", "denialReason"] },
      { title: "Additional Details", fields: ["additionalDetails"] },
   ];

   const handleCreate = async () => {
      setLoading(true)
      let missingFields = [];
      Object.entries(inputs).forEach(([key, value]) => {
         if (!["dateFiled", "submitted", "status", "additionalDetails"].includes(key)) {
            if (/^\s*$/.test(value) || value === 0) {
               missingFields.push(key);
            }
         }
      });

      if (missingFields.length > 0) {
         setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
         setLoading(false)
         return;
      }

      try {
         const {file, url} = await writeAppealLetter(inputs)
         setAppealLetter(file)
         setAppealLetterUrl(url)

         router.push(`/appeal/${appealId}/review`);
      } catch (err) {
         console.error("Error submitting appeal:", err);
         setError("An error occurred. Please try again.");
      } finally {
         setLoading(false)
      }
   };

   if (loading) {
      return (
         <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Crafting your appeal letter...</h2>
            <p className="text-gray-600 text-sm max-w-md">
               We’re working with AI to generate a personalized and persuasive appeal letter based on your details.
            </p>
         </div>
      );
   }

   return (
      <div className="w-full flex items-center justify-center px-4 py-8">
         <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Summary</h2>
            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            {sections.map(({ title, fields }) => (
               <SummaryItem title={title} fields={fields} inputs={inputs}/>
            ))}

            {documents && documents.map((item, index) => (
               <DocumentDisplay item={item} key={index} />
            ))}

            <div className="w-full flex flex-col sm:flex-row justify-between gap-4 mt-6">
               <Link
                  className="w-full sm:w-1/2 text-center rounded-full py-3 bg-gray-600 text-white font-bold text-base sm:text-lg hover:bg-gray-700 transition duration-200"
                  href={`/appeal/${appealId}/additional-details`}
               >
                  Back
               </Link>

               <button
                  onClick={handleCreate}
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
