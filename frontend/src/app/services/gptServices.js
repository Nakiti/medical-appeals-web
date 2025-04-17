import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const extractAppealDetails = async (files) => {
   try {
      const formData = new FormData()
      console.log("gpt files", files)
      files.forEach((item, index) => {
         formData.append(`file${index}`, item)
      })

      const response = await axios.post(`${API_BASE_URL}/gpt/extractData`, formData, 
         {headers: {'Content-Type': 'multipart/form-data'}}
      )
      return response.data
   } catch (err) {
      console.log(err)
   }
}