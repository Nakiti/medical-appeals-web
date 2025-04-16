import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export const updateAppeal = async(id, data, documents) => {
   try {
      console.log("doc", JSON.stringify(documents))
      await axios.put(`${API_BASE_URL}/appeal/update/${id}`, {
         supportingDocuments: JSON.stringify(documents),
         ...data
         
      })
   } catch (err) {
      console.log(err)
   }
}