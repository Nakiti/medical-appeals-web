import Header from "../components/header"

const LoginLayout = ({children}) => {

   return (
      <div>
         <Header />
         {children}
      </div>
   )
}

export default LoginLayout