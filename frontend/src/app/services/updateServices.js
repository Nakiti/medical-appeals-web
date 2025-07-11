import axios from "axios";
import { api } from "./api";
const API_BASE_URL = "http://localhost:8080/api";

export const updateAppeal = async(id, data, documents) => {
   try {
      console.log("doc", JSON.stringify(documents))
      await api.put(`/appeal/update/${id}`, {
         supportingDocuments: JSON.stringify(documents),
         ...data
         
      })
      
   } catch (err) {
      console.log(err)
   }
}

export const updateFile = async(fileId, data, file) => {
   try {
      const form = new FormData()
      
      form.append("file", file)
      form.append("appealId", data.appealId)
      form.append("fileName", data.fileName)
      form.append("fileType", data.fileType)

      console.log(data)
      console.log("form from createFile", form)

      const response = await api.put(`/files/update/${fileId}`, form, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }) 

      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const updateAppealComplete = async(appealId) => {
   try {
      await api.put(`/appeal/updateComplete/${appealId}`)
   } catch (err) {
      console.log(err)
   }
}