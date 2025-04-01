"use client";
import { getNotificationsByAppealId } from "@/app/services/fetchServices";
import { useState, useEffect, use } from "react";

const Updates = ({ params }) => {
   const [notifications, setNotifications] = useState([]);
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getNotificationsByAppealId(appealId);
            setNotifications(response);
            console.log(response);
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, []);

   const categorizeNotifications = (notifications) => {
      const categorized = {
         Today: [],
         Yesterday: [],
         "Last Week": [],
         Earlier: []
      };

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      notifications.forEach((notification) => {
         const notificationDate = new Date(notification.date);
         const differenceInDays = Math.floor((today - notificationDate) / (1000 * 60 * 60 * 24));

         if (differenceInDays === 0) {
            categorized.Today.push(notification);
         } else if (differenceInDays === 1) {
            categorized.Yesterday.push(notification);
         } else if (differenceInDays <= 7) {
            categorized["Last Week"].push(notification);
         } else {
            categorized.Earlier.push(notification);
         }
      });

      return categorized;
   };

   const categorizedNotifications = categorizeNotifications(notifications);

   return (
      <div className="p-8 min-h-screen">
         <div className="container mx-auto md:px-8 bg-white">
            {/* <h1 className="text-2xl text-gray-900 mb-6">Notifications</h1> */}
            <div className="space-y-6">
               {Object.keys(categorizedNotifications).map((section, index) => (
                  categorizedNotifications[section].length > 0 && (
                     <div key={index} className="section-container mb-8">
                        <h2 className="section-header text-lg font-semibold text-gray-800 border-l-4 pl-3 border-blue-500">{section}</h2>
                        <div className="space-y-4 mt-4">
                           {categorizedNotifications[section].map((notification, i) => (
                              <div key={i} className="notification-card bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                                 <div className="flex justify-between mb-2">
                                    <h3 className="notification-title text-md font-medium text-gray-800">{notification.title}</h3>
                                    <span className="notification-date text-sm text-gray-500">{new Date(notification.date).toLocaleDateString()}</span>
                                 </div>
                                 <p className="notification-text text-sm text-gray-700">{notification.text}</p>
                              </div>
                           ))}
                        </div>
                        {index < Object.keys(categorizedNotifications).length - 1 && <div className="section-divider bg-gray-200 h-px my-6" />}
                     </div>
                  )
               ))}
            </div>
         </div>
      </div>
   );
};

export default Updates;
