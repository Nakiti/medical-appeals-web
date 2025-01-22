import axios from "axios";

const API_BASE_URL = "http://localhost:4001/api";

export const login = async(data) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, data, {withCredentials: true})
      console.log(response)
      return response.data

   } catch (err) {
      console.log(err)
   }
}

export const register = async(data) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data)
   } catch (err) {
      console.log(err)
   }
}

export const logout = async() => {
   try {
      await axios.post(`${API_BASE_URL}/auth/logout`)
   } catch (err) {
      console.log(err)
   }
}

