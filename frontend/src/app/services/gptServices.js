import axios from "axios";

const API_BASE_URL = "http://localhost:4001/api";

export const extractAppealDetails = async (file) => {
   try {
      const formData = new FormData()

      formData.append("file", file)

      const response = await axios.post(`${API_BASE_URL}/gpt/extractData`, formData, {
         'Content-Type': 'multipart/form-data',
      })
      return response.data
   } catch (err) {
      console.log(err)
   }
}