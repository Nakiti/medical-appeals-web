import axios from "axios";
import { api } from "./api";

const API_BASE_URL = "http://localhost:8080/api";

export const createAppeal = async(data, documents) => {
   try {
      const appealId = await api.post(`/appeal/create`, {
         supportingDocuments: JSON.stringify(documents),
         ...data
      })
      return appealId.data
   } catch (err) {
      console.log(err)
   }
}

export const createNotification = async (data) => {
   try {
      await api.post(`/notifications/create`, data)
   } catch (err) {
      console.log(err)
   }
}

export const createFile = async(data, file) => {
   try {
      const form = new FormData()
      
      form.append("file", file)
      form.append("appealId", data.appealId)
      form.append("fileName", data.fileName)
      form.append("fileType", data.fileType)

      console.log(data)
      console.log("form from createFile", form)

      const response = await api.post(`/files/create`, form, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }) 

      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const createBatchFiles = async(appealId, files) => {
   if (files.length > 0) {
      try  {
         const formData = new FormData();
         
         files.forEach(file => {
            formData.append('files', file);
            console.log("asd")
         });
         formData.append('appealId', appealId);

         console.log(":asdadasd")
         console.log(files)

         const response = await api.post(`/files/createBatch`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         console.log(response)
         return response.data
      } catch (err) {
         console.log(err)
      }
   }
}

export const createAppealLetter = async(fileId, appealId) => {
   try {
      await api.post(`/appealLetter/create`, {fileId, appealId})
   } catch (err) {
      console.log(err)
   }
}