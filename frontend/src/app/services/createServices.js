import axios from "axios";

const API_BASE_URL = "http://localhost:4001/api";

export const createAppeal = async(userId, internalName) => {
   try {
      const appealId = await axios.post(`${API_BASE_URL}/appeal/create`, 
         {
            userId: userId,
            internalName: internalName
         }
      )
      return appealId.data
   } catch (err) {
      console.log(err)
   }
}