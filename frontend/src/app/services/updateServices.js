import axios from "axios";

const API_BASE_URL = "https://appeals-ekh0d0g4csgcbdfg.westus-01.azurewebsites.net/api";

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