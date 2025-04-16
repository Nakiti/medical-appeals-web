import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import { updateAppeal } from "@/app/services/updateServices"
import { createAppeal, createBatchFiles } from "@/app/services/createServices"
import { AuthContext } from "@/app/context/authContext"
import { useRouter } from "next/navigation"
import { FaRegSave } from "react-icons/fa";

const SaveButton = () => {
   const {inputs, appealId, documents} = useContext(FormContext)
   const {currentUser} = useContext(AuthContext)
   const router = useRouter()

   const handleSave = async() => {
      if (inputs.claimNumber == "") {
         console.log("empty")
         return;
      }
      console.log(appealId, inputs)


      if (appealId != "new") {
         await updateAppeal(
            appealId,
            inputs,
            documents
         )
         await createBatchFiles(appealId, documents.map(item => item.file))
         
      } else {
         const appealId = await createAppeal({
            userId: currentUser,
            ...inputs,
            submitted: 0,
         }, documents)
         await createBatchFiles(appealId, documents.map(item => item.file))
      }

      router.push("/user/dashboard/home")
   }

   return (
      <button 
         onClick={handleSave}
         className="px-4 py-2 text-blue-800 rounded-sm text-sm hover:text-blue-500 transition duration-200">
         <FaRegSave size={24}/>
      </button>
   )
}

export default SaveButton