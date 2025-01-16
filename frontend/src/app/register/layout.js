import Header from "../components/header"

const RegisterLayout = ({children}) => {

   return (
      <div>
         <Header />
         {children}
      </div>
   )
}

export default RegisterLayout