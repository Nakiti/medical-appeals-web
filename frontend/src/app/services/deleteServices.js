import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const deleteDrafts = async (data) => {
   try {
      await axios.delete(`${API_BASE_URL}/appeal/deleteDrafts`, {data: data})
   } catch (err) {
      console.log(err)
   }
}