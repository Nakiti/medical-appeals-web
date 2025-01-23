import axios from "axios";

const API_BASE_URL = "http://appeals-ekh0d0g4csgcbdfg.westus-01.azurewebsites.net/api";

export const deleteDrafts = async (data) => {
   try {
      await axios.delete(`${API_BASE_URL}/appeal/deleteDrafts`, {data: data})
   } catch (err) {
      console.log(err)
   }
}