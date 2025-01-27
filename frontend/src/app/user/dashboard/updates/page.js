"use client"
import { getNotificationByUserId } from "@/app/services/fetchServices";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import useCategorizeNotifications from "@/app/hooks/useCategorizeNotifications";

const Updates = () => {
   const [data, setData] = useState(null)
   const {currentUser} = useContext(AuthContext)

   useEffect(() => {
      const fetchData = async() => {
         try {
            const response = await getNotificationByUserId(currentUser)
            setData(useCategorizeNotifications(response))
         } catch (err) {
            console.log(err)
         }
      }

      fetchData()
   }, [])


   return (
      <div className="p-8">
         <div className="container mx-auto p-8 bg-white rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
            <div className="space-y-6">
            {data && Object.keys(data).map((section, index) => (
                  data[section].length > 0 && (
                     <div key={index} className="section-container mb-8">
                        <h2 className="section-header text-lg font-semibold text-gray-800 border-l-4 pl-3 border-blue-500">{section}</h2>
                        <div className="space-y-4 mt-4">
                           {data[section].map((notification, i) => (
                              <div key={i} className="notification-card bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                                 <div className="flex justify-between mb-2">
                                    <h3 className="notification-title text-md font-medium text-gray-800">{notification.title}</h3>
                                    <span className="notification-date text-sm text-gray-500">{new Date(notification.date).toLocaleDateString("en-US")}</span>
                                 </div>
                                 <p className="notification-text text-sm text-gray-700">{notification.text}</p>
                              </div>
                           ))}
                        </div>
                        {index < Object.keys(data).length - 1 && <div className="section-divider bg-gray-200 h-px my-6" />}
                     </div>
                  )
               ))}
            </div>
         </div>
      </div>
   );
};

export default Updates;
