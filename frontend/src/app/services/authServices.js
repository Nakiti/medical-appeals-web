import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const login = async(data) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data, {withCredentials: true})
      return response.data

   } catch (err) {
      console.log(err)
      return {error: true, message: err.response.data}
   }
}

export const register = async(data) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data)
      return response.data
   } catch (err) {
      console.log(err)
      return {error: true, message: err.response.data}
   }
}

export const logout = async() => {
   try {
      await axios.post(`${API_BASE_URL}/auth/logout`)
   } catch (err) {
      console.log(err)
   }
}

