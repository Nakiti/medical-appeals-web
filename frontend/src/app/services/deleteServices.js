import axios from "axios";
import { api } from "./api";
const API_BASE_URL = "http://localhost:8080/api";

export const deleteDrafts = async (data) => {
   try {
      await api.delete(`/appeal/deleteDrafts`, {data: data})
   } catch (err) {
      console.log(err)
   }
}

export const deleteFiles = async(files) => {
   try {
      await api.delete(`/files/delete`, {
         data: { fileIds: files }
      })
   } catch (err) {
      console.log(err)
   }
}