"use client";
import React from 'react';
import useFormInput from '@/app/hooks/useFormInput';
import { createNotification } from '@/app/services/createServices';
import { useEffect, useState, use } from 'react';
import { getAppeal, getNotificationsByAppealId } from '@/app/services/fetchServices';

const Notifications = ({ params }) => {
   const [inputs, handleInputsChange, setInputs] = useFormInput({ title: "", text: "" });
   const unwrappedParams = use(params);
   const appealId = unwrappedParams.appealId;
   const [appeal, setAppeal] = useState(null);
   const [notifications, setNotifications] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (inputs.title === "" || inputs.text === "") {
         return;
      }

      try {
         await createNotification({ appealId: appealId, userId: appeal.user_id, ...inputs });
         setInputs({ title: "", text: "" }); // Reset form inputs after submission

         // Refresh notifications after sending a new one
         const notificationResponse = await getNotificationsByAppealId(appealId);
         setNotifications(notificationResponse);
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAppeal(appealId);
            setAppeal(response);

            const notificationResponse = await getNotificationsByAppealId(appealId);
            setNotifications(notificationResponse);
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="bg-white">
         <div className="bg-white p-8 w-full">
            <h1 className="text-2xl text-gray-800 mb-6">Send a Notification</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
               {/* Title Input */}
               <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                     Title
                  </label>
                  <input
                     type="text"
                     id="title"
                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                     placeholder="Enter notification title"
                     name="title"
                     value={inputs.title}
                     onChange={handleInputsChange}
                  />
               </div>

               {/* Description Input */}
               <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                     Description
                  </label>
                  <textarea
                     id="description"
                     rows="8"
                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                     placeholder="Enter notification text"
                     name="text"
                     value={inputs.text}
                     onChange={handleInputsChange}
                  ></textarea>
               </div>

               {/* Submit Button */}
               <div className="text-right">
                  <button
                     type="submit"
                     className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                     Send Notification
                  </button>
               </div>
            </form>
         </div>

         {/* Notifications List */}
         <div className="bg-white px-8 pb-8 w-full">
            <h2 className="text-xl text-gray-800 mb-4">Existing Notifications</h2>
            {notifications.length > 0 ? (
               <ul className="space-y-4">
                  {notifications.map((notification) => (
                     <li key={notification.id} className="border p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold">{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.text}</p>
                        <span className="text-xs text-gray-500">Created at: {new Date(notification.date).toLocaleDateString("en-US")}</span>
                     </li>
                  ))}
               </ul>
            ) : (
               <p className="text-sm text-gray-600">No notifications available.</p>
            )}
         </div>
      </div>
   );
};

export default Notifications;
