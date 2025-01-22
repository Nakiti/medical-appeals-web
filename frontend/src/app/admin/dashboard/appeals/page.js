"use client"
import { useState, useEffect } from "react"
import Table from "./components/table"
import { getAllAppeals } from "@/app/services/fetchServices"
import AdminSearchbar from "./components/searchbar"

const Appeals = () => {
   const [appeals, setAppeals] = useState(null)

   useEffect(() => {
      const fetchData = async() => {
         try {
            const response = await getAllAppeals()
            setAppeals(response)
            console.log("rs", response)
         } catch (err) {
            console.log(err)
         }
      }

      fetchData()
   }, [])


   return (
      <div className="md:p-8 w-full min-h-screen bg-gray-50">
         <div className="p-8 w-full min-h-screen bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Appeals</h2>
            <p className="text-gray-700 mb-6">
               The following table lists all appeals.
            </p>

            <AdminSearchbar setData={setAppeals}/>
            {appeals && <Table data={appeals} />}
         </div>
      </div>
   )
}

export default Appeals