import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const deleteDrafts = async (data) => {
   try {
      await axios.delete(`${API_BASE_URL}/appeal/deleteDrafts`, {data: data})
   } catch (err) {
      console.log(err)
   }
}