import axios from "axios";

const API_BASE_URL = "http://appeals-ekh0d0g4csgcbdfg.westus-01.azurewebsites.net/api";

export const getUser = async(userId) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/user/get/${userId}`)
      return response.data[0]
   } catch (err) {
      console.log(err)
   }
}

export const getCurrentUser = async() => {
   try {
      const response = await axios.get(`${API_BASE_URL}/auth/getCurrentUser`, {
         withCredentials: true,
      });
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAppeal = async (id) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/appeal/get/${id}`)
      return response.data[0]
   } catch (err) {
      console.log(err)
   }
}

export const getAppealSearch = async (query, submitted, userId) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/appeal/getAppealSearch/${submitted}/${userId}?q=${query}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAppealsByUser = async(userId) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/appeal/getByUser/${userId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getSubmittedAppeals = async(userId) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/appeal/getSubmitted/${userId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getDrafts = async(userId) => {
   try {
      console.log("from da drafts", userId)
      const response = await axios.get(`${API_BASE_URL}/appeal/getDrafts/${userId}`)
      // console.log("drafts", response.data)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAllAppeals = async() => {
   try {
      const response = await axios.get(`${API_BASE_URL}/appeal/getAllAppeals`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAppealsSearchAdmin = async(query) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/appeal/admin/search?q=${query}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getNotificationByUserId = async(userId) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/notifications/getByUser/${userId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getNotificationsByAppealId = async(appealId) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/notifications/getByAppeal/${appealId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getFilesByAppeal = async(appealId) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/files/get/${appealId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}




