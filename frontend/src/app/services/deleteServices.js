import axios from "axios";

const API_BASE_URL = "https://appeals-ekh0d0g4csgcbdfg.westus-01.azurewebsites.net/api";

export const deleteDrafts = async (data) => {
   try {
      await axios.delete(`${API_BASE_URL}/appeal/deleteDrafts`, {data: data})
   } catch (err) {
      console.log(err)
   }
}

export const deleteFiles = async(files) => {
   try {
      await axios.delete(`${API_BASE_URL}/files/delete`, {
         data: { fileIds: files }
      })
   } catch (err) {
      console.log(err)
   }
}