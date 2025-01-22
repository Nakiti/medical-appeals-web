import React from 'react';

const Contact = () => {
   return (
      <div className="flex items-center justify-center">
         <div className="bg-white p-8 w-full">
            <h1 className="text-2xl text-gray-800 mb-6">Contact Patient</h1>

            {/* Ticket Information */}
            <div className="space-y-6">
               {/* Thread Messages */}
               <div className="space-y-4">
                  {/* Message from Support */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                     <p className="text-sm text-gray-500">Support Agent</p>
                     <p className="mt-1 text-gray-700">
                        Hello! How can we assist you with your issue today?
                     </p>
                  </div>

                  {/* User Reply */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                     <p className="text-sm text-gray-500">You</p>
                     <p className="mt-1 text-gray-700">
                        I'm facing an issue with my account access. Could you please help?
                     </p>
                  </div>

                  {/* Another message from Support */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                     <p className="text-sm text-gray-500">Support Agent</p>
                     <p className="mt-1 text-gray-700">
                        Sure! Please provide us with more details about the issue.
                     </p>
                  </div>
               </div>

               {/* Reply Input */}
               <div className="mt-6">
                  <label htmlFor="reply" className="block text-sm font-medium text-gray-700">
                     Your Reply
                  </label>
                  <textarea
                     id="reply"
                     rows="4"
                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                     placeholder="Type your message here..."
                  ></textarea>
                  <div className="text-right mt-4">
                     <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                     >
                        Send Reply
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Contact;
