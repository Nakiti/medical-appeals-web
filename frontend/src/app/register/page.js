"use client"
import React from 'react';
import useFormInput from '../hooks/useFormInput';
import { useRouter } from 'next/navigation';
import { register } from '../services/authServices';

const Register = () => {
   const [inputs, handleInputsChange, setInputs] = useFormInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
   })
   const router = useRouter()

   const handleRegister = async(e) => {
      e.preventDefault()
      try {
         await register(inputs)
         router.push("/login")
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className="min-h-screen flex justify-center items-start bg-gray-50">
         <div className="bg-white p-8 rounded shadow-md w-full mt-8 max-w-xl">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Create Your Account</h2>
            <form className="mt-6" onSubmit={handleRegister}>
               <div className="flex space-x-4">
                  <div className="w-1/2">
                     <label className="block text-sm text-gray-600">First Name</label>
                     <input
                        type="text"
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="First name"
                        name='firstName'
                        value={inputs.firstName}
                        onChange={handleInputsChange}
                        required
                     />
                  </div>
                  <div className="w-1/2">
                     <label className="block text-sm text-gray-600">Last Name</label>
                     <input
                        type="text"
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Last name"
                        name='lastName'
                        value={inputs.lastName}
                        onChange={handleInputsChange}
                        required
                     />
                  </div>
               </div>
               <div className="mt-4">
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                     type="email"
                     className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                     placeholder="Enter your email"
                     name='email'
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
                     name='password'
                     value={inputs.password}
                     onChange={handleInputsChange}
                     required
                  />
               </div>
               <div className="mt-4">
                  <label className="block text-sm text-gray-600">Confirm Password</label>
                  <input
                     type="password"
                     className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                     placeholder="Confirm your password"
                     name='confirmPassword'
                     value={inputs.confirmPassword}
                     onChange={handleInputsChange}
                     required
                  />
               </div>
               <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
               >
                  Register
               </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
               Already have an account?{' '}
               <a href="/login" className="text-blue-600 hover:underline">
                  Login
               </a>
            </p>
         </div>
      </div>
   );
};

export default Register;
