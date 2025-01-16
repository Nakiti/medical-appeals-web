import React from 'react';
const AppealItem = ({ appeal }) => {

   return (
      <div className="bg-white rounded-md p-4 mb-4 shadow-md cursor-pointer">
         {/* Top Section */}
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">#{appeal.claim_number}</h3>
            <div className="flex items-center">
               <span
                  className={`text-sm px-3 py-1 rounded-full ${
                  appeal.status === 'Approved'
                     ? 'bg-green-100 text-green-700'
                     : appeal.status === 'Submitted'
                     ? 'bg-blue-100 text-blue-700'
                     : appeal.status === 'Under Review'
                     ? 'bg-yellow-100 text-yellow-700'
                     : 'bg-red-100 text-red-700'
                  }`}
               >
                  {appeal.status}
               </span>
            </div>
         </div>

         {/* Description */}
         <p className="text-xs text-gray-600 mb-4">
            {appeal.description || 'No description provided yet.'}
         </p>
         {/* Divider */}
         <div className="h-px bg-gray-200 my-2"></div>

         {/* Date */}
         <p className="text-xs text-gray-500 text-right">
         Date Submitted: {new Date(appeal.date_filed).toLocaleDateString("en-US")}
         </p>
      </div>
   );
};

export default AppealItem;
