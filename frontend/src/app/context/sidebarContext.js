import { createContext, useState } from "react";

export const SidebarContext = createContext()

export const SidebarContextProvider = ({children}) => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   return (
      <SidebarContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>
         {children}
      </SidebarContext.Provider>
   )
}
