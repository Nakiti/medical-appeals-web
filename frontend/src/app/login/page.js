"use client";
import Header from '../components/header';
import useFormInput from '../hooks/useFormInput';
import { useRouter } from 'next/navigation';
import { login } from '../services/authServices';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Login = () => {
   const router = useRouter();
   const [inputs, handleInputsChange, setInputs] = useFormInput({
      email: "",
      password: ""
   });
   const [error, setError] = useState(false); // Updated to `false` initially
   const [errorMessage, setErrorMessage] = useState("");
   const {loginUser} = useContext(AuthContext)

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         setError(false); // Reset error state
         setErrorMessage(""); // Clear any previous error message

         const user = await loginUser(inputs.email, inputs.password);

         if (user.error) {
            setError(true);
            setErrorMessage(user.message);
            return;
         }

         if (user.role === "admin") {
            router.push(`/admin/dashboard/home`);
         } else if (user.role === "patient") {
            router.push(`/user/dashboard/home`);
         }
      } catch (err) {
         console.log(err);
         setError(true);
         setErrorMessage("An unexpected error occurred. Please try again.");
      }
   };

   return (
      <div className="min-h-screen flex justify-center bg-gray-50 p-6">
         <div className="bg-white p-8 rounded shadow-md w-full mt-16 h-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
            <form className="mt-6" onSubmit={handleLogin}>
               <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                     type="email"
                     className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                     placeholder="Enter your email"
                     name="email"
                     value={inputs.email}
                     onChange={handleInputsChange}
                     required
                  />
               </div>
               <div className="mt-4">
                  <label className="block text-sm text-gray-600">Password</label>
                  <input
                     type="password"
                     className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                     placeholder="Enter your password"
                     name="password"
                     value={inputs.password}
                     onChange={handleInputsChange}
                     required
                  />
               </div>
               <div className="flex items-center justify-between mt-4">
                  <label className="flex items-center">
                     <input type="checkbox" className="form-checkbox" />
                     <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#forgot-password" className="text-sm text-blue-600 hover:underline">
                     Forgot Password?
                  </a>
               </div>
               <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
               >
                  Login
               </button>
            </form>

            {/* Error Message */}
            {error && (
               <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  <p className="text-sm">{errorMessage}</p>
               </div>
            )}

            <p className="mt-4 text-center text-sm text-gray-600">
               Don't have an account?{' '}
               <a href="/register" className="text-blue-600 hover:underline">
                  Sign Up
               </a>
            </p>
         </div>
      </div>
   );
};

export default Login;
