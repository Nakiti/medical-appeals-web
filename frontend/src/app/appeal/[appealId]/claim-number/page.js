"use client";
import { useContext, useState } from "react";
import { FormContext } from "@/app/context/formContext";
import { useRouter } from "next/navigation";
import { checkClaimNumber } from "@/app/services/fetchServices";
import { AuthContext } from "@/app/context/authContext";

const ClaimNumber = () => {
   const { inputs, handleInputsChange, appealId } = useContext(FormContext);
   const router = useRouter();
   const { currentUser } = useContext(AuthContext);

   const [claimStatus, setClaimStatus] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const handleProceed = async () => {
      if (!inputs.claimNumber || inputs.claimNumber.trim() === "") {
         setError("Claim number cannot be empty.");
         return;
      }

      setError("");
      setLoading(true);

      try {
         const claimExists = await checkClaimNumber(inputs.claimNumber);
         setClaimStatus(claimExists);

         if (!claimExists) {
            router.push(currentUser ? `/appeal/${appealId}/form-upload` : `/appeal/${appealId}/create-account`);
         }
      } catch (err) {
         console.error("Error checking claim number:", err);
         setError("An error occurred. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-full px-4">
         <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto py-8">
            <p className="text-lg sm:text-xl">Let's Get You Started!</p>
            <p className="text-2xl sm:text-3xl font-semibold">Enter Your Claim Number below:</p>

            <div className="w-full mt-8">
               <label className="text-sm sm:text-md font-bold mb-2">Claim Number</label>
               <input
                  className="rounded-md border border-gray-600 shadow-sm py-3 px-4 sm:py-4 sm:px-6 w-full"
                  value={inputs.claimNumber}
                  name="claimNumber"
                  onChange={handleInputsChange}
                  placeholder="Enter Claim Number"
               />
            </div>

            <div className="w-full mt-4">
               <label className="text-sm sm:text-md font-bold mb-2">Appeal Deadline</label>
               <input
                  className="rounded-md border border-gray-600 shadow-sm py-3 px-4 sm:py-4 sm:px-6 w-full"
                  value={inputs.appealDeadline}
                  name="appealDeadline"
                  onChange={handleInputsChange}
                  placeholder="Enter Appeal Deadline"
                  type="date"
               />
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            {claimStatus !== null && (
               <div className={`mt-4 py-3 px-4 sm:py-4 sm:px-5 rounded-sm text-white text-xs sm:text-sm ${claimStatus ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
                  {claimStatus && currentUser
                     ? "Claim already exists. Check User Dashboard."
                     : claimStatus && !currentUser
                     ? "Claim already exists. Please Login"
                     : "No existing claim found. Proceeding to create one."}
               </div>
            )}

            <div className="mt-6 flex flex-col space-y-4">
               <button
                  className={`w-full rounded-full px-6 py-3 sm:py-4 font-bold text-base sm:text-lg shadow-md transition duration-200 ${
                     loading ? "bg-gray-400" : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                  onClick={handleProceed}
                  disabled={loading}
               >
                  {loading ? "Checking..." : "Next"}
               </button>

               {claimStatus && !currentUser ? (
                  <button
                     className="w-full rounded-full px-6 py-3 sm:py-4 font-bold text-base sm:text-lg shadow-md transition duration-200 bg-gray-600 text-white hover:bg-gray-700"
                     onClick={() => router.push("/login")}
                  >
                     Login
                  </button>
               ) : claimStatus && currentUser ? (
                  <button
                     className="w-full rounded-full px-6 py-3 sm:py-4 font-bold text-base sm:text-lg shadow-md transition duration-200 bg-gray-600 text-white hover:bg-gray-700"
                     onClick={() => router.push("/user/dashboard/home")}
                  >
                     Home
                  </button>
               ) : null}
            </div>
         </div>
      </div>
   );
};

export default ClaimNumber;
