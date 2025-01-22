import axios from "axios";

const API_BASE_URL = "http://localhost:4001/api";

export const extractAppealDetails = async (files) => {
   try {
      const formData = new FormData()

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