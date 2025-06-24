"use client"
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

export default function LandingPage() {
   const { currentUser } = useContext(AuthContext);

   return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-slate-100 text-gray-800 font-sans">
         {/* Navbar */}
         <header className="text-gray-800 shadow-sm">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
               <div className="text-lg font-bold flex items-center gap-2">
                  <div className="w-4 h-4 bg-indigo-600 rounded-sm" /> LOGO
               </div>
               <ul className="hidden md:flex gap-8 text-sm font-medium">
                  <li><Link href="#" className="hover:text-indigo-600 transition">Home</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition">About us</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition">Course</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-indigo-600 transition">Contact</Link></li>
               </ul>
               <div>
                  <Link
                     href={currentUser ? "/user/dashboard/home" : "/login"}
                     className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90 transition font-semibold text-sm"
                  >
                     {!currentUser ? "Login" : "Dashboard"}
                  </Link>
               </div>
            </nav>
         </header>

         {/* Hero */}
         <section className="relative text-gray-900">
            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10 relative">
               {/* Text content */}
               <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight">
                     Medical <br /> Claims AI
                  </h1>
                  <p className="mt-4 text-gray-600">
                     Harness the power of AI to simplify your medical claim appeals. Get faster decisions, personalized guidance, and seamless tracking—without the paperwork headache.
                  </p>
                  <div className="mt-6">
                     <Link
                        href="/appeal/new/claim-number/"
                        className="inline-block px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-sm font-semibold hover:opacity-90 transition"
                     >
                        Start Now
                     </Link>
                  </div>
               </div>

               {/* Image / Illustration */}
               <div className="flex justify-center relative z-10">
                  <img
                     src="https://t3.ftcdn.net/jpg/06/12/19/14/360_F_612191457_UFIwIhYPbkig1OW8GHVF9E2ZlHHrzpc3.jpg" // Place your illustration in public/ and update the path
                     alt="Business team illustration"
                     className="max-w-full h-auto"
                  />
               </div>
            </div>

         </section>
         {/* Why AI Section */}
         <section className="text-gray-800 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AI for Medical Claims?</h2>
               <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                  Let data and automation do the heavy lifting. Here’s how our AI-driven platform makes your claims process smarter, faster, and more reliable.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Box 1 */}
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-5xl font-extrabold text-indigo-600 mb-4">10x</div>
                  <h3 className="text-lg font-semibold mb-2">Faster Resolutions</h3>
                  <p className="text-sm text-gray-600">
                     AI reviews documents and generates appeal drafts in seconds, reducing wait times dramatically.
                  </p>
                  </div>

                  {/* Box 2 */}
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-5xl font-extrabold text-indigo-600 mb-4">95%</div>
                  <h3 className="text-lg font-semibold mb-2">Accuracy Rate</h3>
                  <p className="text-sm text-gray-600">
                     Machine learning models are trained to detect missing info and ensure every appeal is complete.
                  </p>
                  </div>

                  {/* Box 3 */}
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-5xl font-extrabold text-indigo-600 mb-4">24/7</div>
                  <h3 className="text-lg font-semibold mb-2">Anytime Access</h3>
                  <p className="text-sm text-gray-600">
                     Your appeals never sleep. Manage submissions, status, and timelines around the clock.
                  </p>
                  </div>
               </div>
            </div>
         </section>
         {/* Staggered Testimonial Section */}
         <section className="text-gray-800 py-20">
         <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 mb-12">
               Real people. Real results. See how AI is changing the way patients manage appeals.
            </p>

            <div className="space-y-12 relative">
               {/* Testimonial 1 */}
               <div className="bg-gray-50 p-6 rounded-xl shadow-md w-full md:w-3/4 md:ml-auto">
               <div className="flex items-center gap-4 mb-3">
                  <img
                     src="https://via.placeholder.com/64"
                     alt="User 1"
                     className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                     <h4 className="font-semibold text-sm">Emily R.</h4>
                     <p className="text-xs text-gray-500">San Diego, CA</p>
                  </div>
               </div>
               <p className="text-sm text-gray-700 text-left">
                  “This platform helped me file a successful appeal without stress. The AI guided me through every step!”
               </p>
               </div>

               {/* Testimonial 2 */}
               <div className="bg-gray-50 p-6 rounded-xl shadow-md w-full md:w-3/4 md:mr-auto">
               <div className="flex items-center gap-4 mb-3">
                  <img
                     src="https://via.placeholder.com/64"
                     alt="User 2"
                     className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                     <h4 className="font-semibold text-sm">Michael T.</h4>
                     <p className="text-xs text-gray-500">Austin, TX</p>
                  </div>
               </div>
               <p className="text-sm text-gray-700 text-left">
                  “The turnaround time was unbelievable. I had an appeal ready in minutes — and it worked!”
               </p>
               </div>

               {/* Testimonial 3 */}
               <div className="bg-gray-50 p-6 rounded-xl shadow-md w-full md:w-3/4 md:ml-auto">
               <div className="flex items-center gap-4 mb-3">
                  <img
                     src="https://via.placeholder.com/64"
                     alt="User 3"
                     className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                     <h4 className="font-semibold text-sm">Sophia L.</h4>
                     <p className="text-xs text-gray-500">New York, NY</p>
                  </div>
               </div>
               <p className="text-sm text-gray-700 text-left">
                  “As someone new to appeals, I felt supported the whole way. The interface is so intuitive.”
               </p>
               </div>
            </div>
         </div>
         </section>




         {/* Footer */}
         <footer className="bg-indigo-700 text-white text-center text-sm py-4">
            &copy; {new Date().getFullYear()} Medical Appeals. All rights reserved.
         </footer>
      </div>
   );
}
