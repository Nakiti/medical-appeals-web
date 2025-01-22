import { AuthContextProvider } from "../context/authContext"

const AdminLayout = ({children}) => {

   return (
      <AuthContextProvider>
         {children}
      </AuthContextProvider>
   )
}

export default AdminLayout