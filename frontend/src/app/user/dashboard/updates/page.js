"use client"
import { useState } from "react";

const notifications = [
   { section: 'Today', data: [{ title: 'New Message', date: '14h ago', description: 'You have received a new message from John.' }] },
   { section: 'Yesterday', data: [{ title: 'System Update', date: '1d ago', description: 'System update completed successfully.', button: 'Follow' }] },
   { section: 'This Week', data: [
         { title: 'Meeting Reminder', date: '2d ago', description: 'Don\'t forget your meeting at 10:00 AM tomorrow.' },
         { title: 'Project Submission', date: '2d ago', description: 'Your project submission has been received.' }
      ]
   }
];

const Updates = () => {
   return (
      <div className="p-8 bg-gray-50">

         <div className="container mx-auto p-8 bg-white rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>
            <div className="space-y-6">
               {notifications.map((section, index) => (
                  <div key={index} className="section-container mb-8">
                     <h2 className="section-header text-xl font-semibold text-gray-800 border-l-4 pl-3 border-blue-500">{section.section}</h2>
                     <div className="space-y-4 mt-4">
                        {section.data.map((notification, i) => (
                           <div key={i} className="notification-card bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                              <div className="flex justify-between mb-2">
                                 <h3 className="notification-title text-md font-medium text-gray-800">{notification.title}</h3>
                                 <span className="notification-date text-sm text-gray-500">{notification.date}</span>
                              </div>
                              <p className="notification-description text-sm text-gray-700">{notification.description}</p>
                           </div>
                        ))}
                     </div>
                     {index < notifications.length - 1 && <div className="section-divider bg-gray-200 h-px my-6" />}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Updates;
