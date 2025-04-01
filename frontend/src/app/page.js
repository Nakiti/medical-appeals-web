// File: components/LandingPage.js
"use client"
import Link from "next/link";

export default function LandingPage() {
   return (
     <div className="bg-gray-100 min-h-screen">
       {/* Header */}
       <header className="bg-white text-gray-800 border-b border-gray-300 py-2">
         <nav className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
           <h1 className="text-md font-bold">Medical Appeals</h1>
           <div className="space-x-4">
             <Link href="/login" className="px-4 py-2 rounded bg-white text-gray-800 text-sm border border-gray-300 hover:bg-gray-100">
               Log In
             </Link>
           </div>
         </nav>
       </header>

       {/* Banner */}
       <section className="relative bg-gray-300 text-gray-900 flex items-center justify-center" style={{ height: "500px" }}>
         <img
           src="https://media.post.rvohealth.io/wp-content/uploads/2020/07/doctor-doing-a-medical-exam-732x549-thumbnail.jpg"
           alt="Banner"
           className="absolute inset-0 object-cover w-full h-full opacity-30"
         />
         <div className="relative text-center">
           <h2 className="text-4xl font-extrabold">Simplifying Medical Appeals</h2>
           <p className="mt-4 text-lg">Take control of your medical appeals process.</p>
           <Link href="/appeal/claim-number" className="mt-12 px-6 py-3 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300">
             Get Started
           </Link>
         </div>
       </section>

       {/* Information Section */}
       <section className="py-16 bg-white">
         <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Content Block 1 */}
           <div className="bg-gray-100 p-6 rounded border border-gray-300">
             <h3 className="mt-4 text-xl font-bold text-gray-800">Step-by-Step Guide</h3>
             <p className="mt-2 text-gray-600">
               Learn how to file and track your medical appeals with ease.
             </p>
           </div>

           {/* Content Block 2 */}
           <div className="bg-gray-100 p-6 rounded border border-gray-300">
             <h3 className="mt-4 text-xl font-bold text-gray-800">Success Stories</h3>
             <p className="mt-2 text-gray-600">
               See how we've helped others achieve successful appeal outcomes.
             </p>
           </div>

           {/* Content Block 3 */}
           <div className="bg-gray-100 p-6 rounded border border-gray-300">
             <h3 className="mt-4 text-xl font-bold text-gray-800">Track Your Progress</h3>
             <p className="mt-2 text-gray-600">
               Use our platform to track your case and stay updated.
             </p>
           </div>
         </div>
       </section>

       {/* Additional Sections */}
       <section className="py-16 bg-gray-50">
         <div className="max-w-6xl mx-auto px-4">
           <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Us</h2>
           <p className="mt-4 text-center text-gray-600">
             Our platform is designed to streamline the appeals process, providing step-by-step guidance and personalized support.
           </p>
         </div>
       </section>

       <section className="py-16 bg-white">
         <div className="max-w-6xl mx-auto px-4">
           <h2 className="text-3xl font-bold text-center text-gray-800">Frequently Asked Questions</h2>
           <div className="mt-8 space-y-6">
             <div className="border-t border-gray-300 pt-4">
               <h3 className="text-xl font-semibold text-gray-800">What is a medical appeal?</h3>
               <p className="mt-2 text-gray-600">
                 A medical appeal is the process of requesting your insurance company to review and reconsider a denied claim.
               </p>
             </div>
             <div className="border-t border-gray-300 pt-4">
               <h3 className="text-xl font-semibold text-gray-800">How do I start an appeal?</h3>
               <p className="mt-2 text-gray-600">
                 Start by gathering all necessary documents, understanding the denial reason, and submitting a detailed appeal.
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* Footer */}
       <footer className="bg-gray-200 text-gray-800 py-6">
         <div className="max-w-7xl mx-auto text-center">
           <p>&copy; {new Date().getFullYear()} Medical Appeals. All rights reserved.</p>
         </div>
       </footer>
     </div>
   );
}
