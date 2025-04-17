import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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