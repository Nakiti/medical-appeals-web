import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const createAppeal = async(data, documents) => {
   try {
      const appealId = await axios.post(`${API_BASE_URL}/appeal/create`, {
         supportingDocuments: JSON.stringify(documents),
         ...data
      }

      )
      return appealId.data
   } catch (err) {
      console.log(err)
   }
}

export const createNotification = async (data) => {
   try {
      await axios.post(`${API_BASE_URL}/notifications/create`, data)
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


      const response = await axios.post(`${API_BASE_URL}/files/create`, form, {
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
   try  {
      const formData = new FormData();
      
      files.forEach(file => {
         formData.append('files', file);
      });
      formData.append('appealId', appealId);

      console.log(":asdadasd")
      console.log(files)

      await axios.post(`${API_BASE_URL}/files/createBatch`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
   } catch (err) {
      console.log(err)
   }
}

export const createAppealLetter = async(fileId, appealId) => {
   try {
      await axios.post(`${API_BASE_URL}/appealLetter/create`, {fileId, appealId})
      
   } catch (err) {
      console.log(err)
   }
}