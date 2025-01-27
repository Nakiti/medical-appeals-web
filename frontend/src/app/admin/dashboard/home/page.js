"use client"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import Table from "@/app/user/dashboard/home/components/table"
import { useState, useEffect } from "react"
import { getAllSubmittedAppeals, getSubmittedAppeals } from "@/app/services/fetchServices"

const AdminHome = () => {
   const [appeals, setAppeals] = useState(null)

   const appealColumns = [
      { title: "Id", value: "id" },
      { title: "First Name", value: "first_name"},
      { title: "Last Name", value: "last_name"},
      { title: "Internal Name", value: "internal_name" },
      { title: "Claim Number", value: "claim_number" },
      { title: "Date Filed", value: "date_filed" },
      { title: "Status", value: "status" },
   ];

   useEffect(() => {
      const fetchData = async() => {
         try {
            const response = await getAllSubmittedAppeals()
            setAppeals(response)
         } catch (err) {
            console.log(err)
         }
      }

      fetchData()
   }, [])

   return (
      <div className="p-8 bg-gray-100 min-h-screen">
         <div className="flex flex-col mb-6">
            <p className="text-sm font-semibold text-gray-600">January 22, 2025</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
               Welcome, first last
            </h1>
         </div>
         <div>
            
         </div>
         <div className="flex flex-row w-full space-x-4">
            <div className="flex flex-col w-3/4">
               <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                     <Link href={`/user/dashboard/drafts`} className="flex items-center">
                        <h2 className="text-lg font-semibold text-gray-800 mr-4">Recently Submitted</h2>
                        <FaArrowRight />
                     </Link>
                  </div>
                  {appeals && <Table data={appeals} columns={appealColumns}/>}
               </div>
            </div>
            <div className="flex flex-col">

            </div>
         </div>
      </div>
   )
}

export default AdminHome