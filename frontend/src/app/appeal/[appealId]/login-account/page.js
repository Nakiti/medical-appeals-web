"use client";
import { useState, useContext } from "react";
import DefaultInput from "../../components/defaultInput";
import { useRouter } from "next/navigation";
import useFormInput from "@/app/hooks/useFormInput";
import { FormContext } from "@/app/context/formContext";
import { AuthContext } from "@/app/context/authContext";
import Link from "next/link";
import { getCurrentUser } from "@/app/services/fetchServices";

const LoginAccountPage = () => {
   const router = useRouter();
   const [inputs, handleInputsChange] = useFormInput({
      email: "",
      password: ""
   });
   const { appealId, setIsLoggedIn } = useContext(FormContext);
   const {setCurrentUser, loginUser} = useContext(AuthContext)
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

   const handleLogin = async () => {
      setServerError("");

      if (!validateInputs()) return;

      try {
         await loginUser(inputs.email, inputs.password);
         setIsLoggedIn(true);
         router.push(`/appeal/${appealId}/form-upload`);
      } catch (err) {
         setServerError(err.message || "An error occurred while logging in.");
      }
   };

   return (
      <div className="w-full flex items-center justify-center px-4 py-8">
         <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/3">
            <div className="mb-4">
               <p className="text-lg sm:text-xl text-left">First, Let's Sign In</p>
               <p className="text-2xl sm:text-3xl font-semibold text-left">Login:</p>
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
               className="w-full mt-8 rounded-full py-3 sm:py-4 bg-blue-800 text-white font-bold text-base sm:text-lg hover:bg-blue-900 transition duration-200"
               onClick={handleLogin}
            >
               Login
            </button>
            <div className="mt-4 text-center">
               <p className="text-sm text-slate-400">
                  Don't have an account?{" "}
                  <Link href={`/appeal/${appealId}/create-account`} className="text-blue-500 hover:underline">
                     Create Account
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default LoginAccountPage;
