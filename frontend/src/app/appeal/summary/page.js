"use client";
import { updateAppeal } from "@/app/services/updateServices";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/authContext";
import { createAppeal } from "@/app/services/createServices";
import { FormContext } from "@/app/context/formContext";
import Link from "next/link";

const Summary = () => {
   const router = useRouter();
   const { currentUser } = useContext(AuthContext);
   const { inputs, appealId, documents } = useContext(FormContext);
   const [error, setError] = useState("");

   const sections = [
      { title: "Patient Details", fields: ["name", "dob", "gender", "contact"] },
      { title: "Medical Information", fields: ["diagnosis", "treatment", "medications"] },
      { title: "Appeal Details", fields: ["claimNumber", "reason", "insurance", "denialReason"] },
      { title: "Additional Details", fields: ["additionalDetails"] },
      { title: "Supporting Documents", fields: ["document1", "document2", "document3"] },
   ];

   const handleSubmit = async () => {
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
         return;
      }

      try {
         const appealData = {
            userId: currentUser,
            ...inputs,
            dateFiled: new Date().toISOString().slice(0, 19).replace("T", " "),
            submitted: 1,
            status: "Submitted",
         };

         if (appealId) {
            await updateAppeal(appealId, appealData, documents);
         } else {
            await createAppeal(appealData, documents);
         }

         router.push("/user/dashboard/home");
      } catch (err) {
         console.error("Error submitting appeal:", err);
         setError("An error occurred. Please try again.");
      }
   };

   return (
      <div className="w-full flex items-center justify-center py-8">
         <div className="w-2/3 mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Summary</h2>

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            {sections.map(({ title, fields }) => (
               <div key={title} className="mb-6">
                  <h3 className="text-xl font-semibold border-b pb-2 mb-4">{title}</h3>
                  <ul className="space-y-2">
                     {fields.map((field) => (
                        <li key={field} className="flex justify-between border-b pb-2">
                           <span className="font-medium">{field.replace(/([A-Z])/g, ' $1').trim()}:</span>
                           <span>{inputs[field] || "N/A"}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}

            <div className="w-full flex flex-row justify-between mt-6 space-x-4">
               <Link
                  className="w-1/2 text-center rounded-full py-3 bg-gray-600 text-white font-bold text-lg hover:bg-gray-700 transition duration-200"
                  href="/appeal/additional-details"
               >
                  Previous
               </Link>

               <button
                  onClick={handleSubmit}
                  className="w-1/2 rounded-full py-3 bg-blue-800 text-white font-bold text-lg hover:bg-blue-900 transition duration-200"
               >
                  Submit Appeal
               </button>
            </div>
         </div>
      </div>
   );
};

export default Summary;
