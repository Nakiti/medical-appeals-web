"use client";
import { useState, useContext, use } from "react";
import DefaultInput from "../../components/defaultInput";
import { useRouter } from "next/navigation";
import useFormInput from "@/app/hooks/useFormInput";
import { register, login } from "@/app/services/authServices";
import Link from "next/link";
import { FormContext } from "@/app/context/formContext";
import { AuthContext } from "@/app/context/authContext";

const CreateAccountPage = () => {
   const router = useRouter();
   const [inputs, handleInputsChange] = useFormInput({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
   });
   const { appealId, setIsLoggedIn } = useContext(FormContext);
   const {setCurrentUser} = useContext(AuthContext)

   const [errors, setErrors] = useState({});
   const [serverError, setServerError] = useState("");

   const inputFields = {
      firstName: "First Name",
      lastName: "Last Name",
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
         const response = await register(inputs);
         if (response.error) {
            setServerError(response.message);
            return;
         }

         const loginResponse = await login({ email: inputs.email, password: inputs.password });
         console.log(loginResponse)
         setCurrentUser(loginResponse.id)
         setIsLoggedIn(true)

         router.push(`/appeal/${appealId}/form-upload`);
      } catch (err) {
         setServerError(err.message || "An error occurred while registering.");
      }
   };

   return (
      <div className="w-full flex items-center justify-center px-4 py-8">
         <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/3">
            <div className="mb-4">
               <p className="text-lg sm:text-xl text-left">First, Let's Create an Account</p>
               <p className="text-2xl sm:text-3xl font-semibold text-left">Register:</p>
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
               onClick={handleRegister}
            >
               Create
            </button>

            <div className="mt-4 text-center">
               <p className="text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link href={`/appeal/${appealId}/login-account`} className="text-blue-500 hover:underline">
                     Log in
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
};

export default CreateAccountPage;
