import { AuthContextProvider } from "@/app/context/authContext"

const UserLayout = ({children}) => {

   return (
      <AuthContextProvider>
         {children}
      </AuthContextProvider>
   )
}

export default UserLayout