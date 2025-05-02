import axios from "axios";

const API_BASE_URL = "https://appeals-ekh0d0g4csgcbdfg.westus-01.azurewebsites.net/api";

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
      return JSON.parse(response.data)
   } catch (err) {
      console.log(err)
   }
}

export const writeAppealLetter = async(inputs) => {
   try {
      const response = await axios.post(
         `${API_BASE_URL}/gpt/writeLetter`,
         inputs,
         {
            responseType: "blob",
         }
      )


      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const file = new File([blob], "appeal-letter.pdf", {
         type: "application/pdf",
         lastModified: Date.now(),
       });

      console.log(file, url)
      return {file: file, url: url}

   } catch (err) {
      console.log(err)
   }
}