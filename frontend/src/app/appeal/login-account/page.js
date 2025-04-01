"use client";
import { useState } from "react";
import DefaultInput from "../components/defaultInput";
import { useRouter } from "next/navigation";
import useFormInput from "@/app/hooks/useFormInput";
import { login } from "@/app/services/authServices";

const LoginAccountPage = () => {
   const router = useRouter();
   const [inputs, handleInputsChange] = useFormInput({
      email: "",
      password: ""
   });

   const [errors, setErrors] = useState({});
   const [serverError, setServerError] = useState("");

   const inputFields = {
      email: "Email Address",
      password: "Password"
   };

   const validateInputs = () => {
      let newErrors = {};
      Object.keys(inputFields).forEach((key) => {
         if (!inputs[key].trim()) {
            newErrors[key] = `${inputFields[key]} is required`;
         }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleRegister = async () => {
      setServerError(""); 

      if (!validateInputs()) return;

      try {

         await login({ email: inputs.email, password: inputs.password });
         router.push("/appeal/form-upload");
      } catch (err) {
         setServerError(err.message || "An error occurred while registering.");
      }
   };

   return (
      <div className="w-full flex items-center justify-center py-6">
         <div className="w-1/3 mx-auto">
            <div className="mb-4">
               <p className="text-xl text-left">First, Let's Create an Account</p>
               <p className="text-3xl font-semibold text-left">Register:</p>
            </div>

            <div className="grid gap-4">
               {Object.entries(inputFields).map(([key, label]) => (
                  <div key={key}>
                     <DefaultInput
                        label={label}
                        value={inputs[key]}
                        placeholder={`Enter ${label}`}
                        name={key}
                        handleInputsChange={handleInputsChange}
                     />
                     {errors[key] && (
                        <p className="text-red-600 text-sm mt-1">{errors[key]}</p>
                     )}
                  </div>
               ))}
            </div>

            {serverError && (
               <p className="text-red-600 text-sm mt-2 text-center">{serverError}</p>
            )}

            <button
               className="w-full mx-auto mt-8 rounded-full py-4 bg-blue-800 text-white font-bold text-lg hover:bg-blue-900 transition duration-200"
               onClick={handleRegister}
            >
               Create
            </button>
         </div>
      </div>
   );
};

export default LoginAccountPage;
