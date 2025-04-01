"use client";
import { useContext, useState } from "react";
import { FormContext } from "@/app/context/formContext";
import { useRouter } from "next/navigation";
import { checkClaimNumber } from "@/app/services/fetchServices";
import { AuthContext } from "@/app/context/authContext";

const ClaimNumber = () => {
   const { inputs, handleInputsChange } = useContext(FormContext);
   const router = useRouter();
   const { currentUser } = useContext(AuthContext);

   const [claimStatus, setClaimStatus] = useState(null); // Stores whether claim exists
   const [loading, setLoading] = useState(false); // Handles loading state
   const [error, setError] = useState(""); // Handles empty claim number error

   const handleProceed = async () => {
      if (!inputs.claimNumber || inputs.claimNumber.trim() === "") {
         setError("Claim number cannot be empty.");
         return;
      }

      setError(""); // Clear error if input is valid
      setLoading(true);

      try {
         const claimExists = await checkClaimNumber(inputs.claimNumber);
         setClaimStatus(claimExists); // Store result but do NOT auto-redirect
         
         // If claim doesn't exist, proceed to create appeal
         if (!claimExists) {
            router.push(currentUser ? "/appeal/form-upload" : "/appeal/create-account");
         }
      } catch (err) {
         console.error("Error checking claim number:", err);
         setError("An error occurred. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-full">
         <div className="w-1/3 mx-auto py-8">
            <p className="text-xl">Let's Get You Started!</p>
            <p className="text-3xl font-semibold">Enter Your Claim Number below:</p>

            <div className="w-full mt-8">
               <label className="text-md font-bold mb-2">Claim Number</label>
               <input
                  className="rounded-md border border-gray-600 shadow-sm py-4 px-6 w-full"
                  value={inputs.claimNumber}
                  name="claimNumber"
                  onChange={handleInputsChange}
                  placeholder="Enter Claim Number"
               />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            {/* Status Message */}
            {claimStatus !== null && (
               <div className={`mt-4 py-4 px-5 rounded-sm text-white text-xs ${claimStatus ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
                  {claimStatus ? "Claim already exists. Please log in." : "No existing claim found. Proceed to create one."}
               </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-col space-y-4">
               <button
                  className={`w-full rounded-full px-6 py-4 font-bold text-lg shadow-md transition duration-200 ${loading ? "bg-gray-400" : "bg-blue-700 text-white hover:bg-blue-800"}`}
                  onClick={handleProceed}
                  disabled={loading} // Disable button while checking
               >
                  {loading ? "Checking..." : "Next"}
               </button>

               {/* Show "Login" button only if claim exists */}
               {claimStatus && (
                  <button
                     className="w-full rounded-full px-6 py-4 font-bold text-lg shadow-md transition duration-200 bg-gray-600 text-white hover:bg-gray-700"
                     onClick={() => router.push("/login")}
                  >
                     Login
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default ClaimNumber;
