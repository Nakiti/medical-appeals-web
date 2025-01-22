"use client"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "@/app/context/authContext"
import useFormInput from "@/app/hooks/useFormInput"
import { FaCheck, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

/*
   Component: Users
   Description: renders user page and allows for users to be added and managed
*/
const Users = ({params}) => {
   const [users, setUsers] = useState([])
   const [newUser, handleNewUserChange, setNewUser] = useFormInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "password"
   })
   const organizationId = params.organizationId
   const { currentUser } = useContext(AuthContext);

   /*
      Function: handleRoleChange
      Description: Changes fields of a user
      Props:
         - id: id of user to be changed
         - field: field to be changed
         - value: new value for field
   */
   const handleRoleChange = (id, field, value) => {
      setUsers(users.map(user => 
         user.id === id ? { ...user, [field]: value } : user
      ));
   };

   /*
      Function: handleAddUser
      Description: Adds a user to an organization
      Props:
         - e: event properties
   */
   const handleAddUser = async (e) => {
      e.preventDefault();
      try {
         const userId = await createUser({...newUser});
         await createUserOrganizationRelation(userId, organizationId, "pending", "user")
         setNewUser({ firstName: "", lastName: "", email: "" });
         await fetchData();
      } catch (err) {
         console.log(err);
      }
   };

   /*
      Function: handleConfirm
      Description: updates changes made to user
      Props:
         - id: id of user that is changed
   */
   const handleConfirm = async (id) => {
      const updatedUser = users.find(user => user.id === id);

      try {
         await updateUser(id, {role: updatedUser.role});
         fetchData()
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      fetchData();
   }, [currentUser]);

   const fetchData = async () => {
      try {
         const response = await getAllUsers(currentUser.id);
         setUsers(response);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="h-full w-full bg-gray-50 overflow-y-auto ">
         <div className="p-6 bg-gray-50">
            <div className="w-full h-full bg-white rounded-lg p-8">
               <Link 
                  href={`/org/${organizationId}/dashboard/settings`}
                  className="text-gray-700 flex flex-row items-center space-x-2"
               >
                  <FaArrowLeft className="text-gray-700"/>
                  <p>Settings</p>
               </Link>
               <div className="p-6">
                  <h1 className="text-3xl font-semibold mb-4 text-gray-800">Users</h1>
                  <p className="text-gray-700">Manage the users that can access your organization</p>
               </div>
               <div className="overflow-x-auto w-full p-6">
                  <h1 className="text-xl mb-4">Active Users</h1>
                  <table className="min-w-full bg-white text-sm">
                     <thead>
                        <tr>
                           <th className="px-6 py-2 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">First Name</th>
                           <th className="px-6 py-2 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Last Name</th>
                           <th className="px-6 py-2 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Email</th>
                           <th className="px-6 py-2 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Role</th>
                           <th className="px-6 py-2 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Update</th>
                        </tr>
                     </thead>
                     <tbody>
                        {users && users.map((user) => (
                           <tr key={user.id} className="border-b border-gray-200 text-md hover:bg-gray-50">
                              <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{user.first_name}</td>
                              <td className="px-6 py-2 text-gray-700 whitespace-nowrap">{user.last_name}</td>
                              <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{user.email}</td>
                              <td className="px-6 py-2 border-b border-gray-300">
                                 <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, 'status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                 >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                 </select>
                              </td>
                              <td className="px-6 py-1 border-b border-gray-300">
                                 <button
                                    onClick={() => handleConfirm(user.id)}
                                    className="px-4 py-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                 >
                                    <FaCheck />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="w-full border-b border-gray-300 my-4 px-6" />
               <div className="p-6">
                  <h2 className="text-xl mb-4 text-gray-800">Add New User</h2>
                  <form onSubmit={handleAddUser} className="grid grid-cols-4 gap-x-2 gap-y-4 w-3/4 text-sm">
                     <div className="flex flex-col col-start-1 col-end-3">
                        <label className="text-gray-700 text-sm font-semibold mb-1">First Name</label>
                        <input
                           type="text"
                           name="firstName"
                           placeholder="First Name"
                           value={newUser.firstName}
                           onChange={handleNewUserChange}
                           className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                           required
                        />
                     </div>
                     <div className="flex flex-col col-start-3 col-end-5">
                        <label className="text-gray-700 text-sm font-semibold mb-1">Last Name</label>
                        <input
                           type="text"
                           name="lastName"
                           placeholder="Last Name"
                           value={newUser.lastName}
                           onChange={handleNewUserChange}
                           className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                           required
                        />
                     </div>
                     <div className="flex flex-col col-start-1 col-end-4">
                        <label className="text-gray-700 text-sm font-semibold mb-1">Email Address</label>
                        <input
                           type="email"
                           name="email"
                           placeholder="Email"
                           value={newUser.email}
                           onChange={handleNewUserChange}
                           className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                           required
                        />
                     </div>
                     <div className="flex justify-center items-end">
                        <button
                           type="submit"
                           className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                           Add
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Users