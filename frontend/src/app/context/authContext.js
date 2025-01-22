"use client";
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/fetchServices";

export const AuthContext = createContext()

//need to fix getCurrentUser, 

export const AuthContextProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null);
 
   useEffect(() => {
      // always checks that user is logged in
      const fetchData = async () => {
         const response = await getCurrentUser()
         console.log(response.id)
         setCurrentUser(response.id)
         console.log(currentUser)
      }
      
      fetchData()
   }, []);

   return (
      <AuthContext.Provider value={{currentUser}}>
         {children}
      </AuthContext.Provider>
   );
}
