import axios from "axios";
import { api } from "./api";

const API_BASE_URL = "http://localhost:8080/api";

export const login = async(data) => {
   try {
      console.log(data)
      const response = await api.post(`/auth/login`, data)
      console.log(response)
      return response.data

   } catch (err) {
      console.log(err)
      return {error: true, message: err.response.data}
   }
}

export const register = async(data) => {
   try {
      const response = await api.post(`/auth/register`, data)
      return response.data
   } catch (err) {
      console.log(err)
      return {error: true, message: err.response.data}
   }
}

export const logout = async() => {
   try {
      await api.post(`/auth/logout`)
   } catch (err) {
      console.log(err)
   }
}

