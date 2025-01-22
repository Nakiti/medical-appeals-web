import Link from "next/link"


const Settings = ({}) => {

   return (
      <div className="w-full h-full" >
         <div className="w-full h-full flex flex-col p-12 overflow-y-auto rounded-sm">
            <h1 className="text-4xl mb-8">Settings</h1>
            <div className="grid grid-cols-2 gap-8 w-full">
               <Link href={`/admin/dashboard/settings/users`} className="w-full bg-white rounded-md shadow-md p-8 h-48 hover:bg-gray-100 cursor-pointer">
                  <p className="text-xl text-black mb-4">Users</p>
                  <p className="text-sm text-gray-700">Add and Manage Users</p>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default Settings