"use client";
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/fetchServices";

export const AuthContext = createContext()

//need to fix getCurrentUser, 

export const AuthContextProvider = ({children}) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [loading, setLoading] = useState(true)
 
   useEffect(() => {
      // always checks that user is logged in
      const fetchData = async () => {
         const response = await getCurrentUser()
         console.log("from auth context ", response?.id)
         setCurrentUser(response?.id)
         setLoading(false)
      }
      
      fetchData()
   }, [currentUser]);

   return (
      <AuthContext.Provider value={{currentUser, loading, setCurrentUser}}>
         {children}
      </AuthContext.Provider>
   );
}
