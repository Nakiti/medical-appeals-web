import { createContext, useState } from "react";

export const CameraContext = createContext()

export const CameraContextProvider = ({children}) => {
   const [images, setImages] = useState([])

   return (
      <CameraContext.Provider value={{images, setImages}}>
         {children}
      </CameraContext.Provider>
   )
}
