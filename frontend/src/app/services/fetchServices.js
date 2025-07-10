import axios from "axios";
import { api } from "./api";

const API_BASE_URL = "http://localhost:8080/api";

export const getUser = async(userId) => {
   try {
      const response = await api.get(`/user/get/${userId}`)
      return response.data[0]
   } catch (err) {
      console.log(err)
   }
}

export const getCurrentUser = async() => {
   try {
      const response = await api.get(`/auth/getCurrentUser`);
      return response.data
   } catch (err) {
      console.log(err)
      return null
   }
}

export const getAppeal = async (id) => {
   try {
      const response = await api.get(`/appeal/get/${id}`)
      return response.data[0]
   } catch (err) {
      console.log(err)
   }
}

export const getAppealSearch = async (query, submitted, userId) => {
   try {
      const response = await api.get(`/appeal/getAppealSearch/${submitted}/${userId}?q=${query}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAppealsByUser = async(userId) => {
   try {
      const response = await api.get(`/appeal/getByUser/${userId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getSubmittedAppeals = async(userId) => {
   try {
      const response = await api.get(`/appeal/getSubmitted/${userId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getDrafts = async(userId) => {
   try {
      console.log("from da drafts", userId)
      const response = await api.get(`/appeal/getDrafts/${userId}`)
      // console.log("drafts", response.data)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAllAppeals = async() => {
   try {
      const response = await api.get(`/appeal/getAllAppeals`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAppealsSearchAdmin = async(query) => {
   try {
      const response = await api.get(`/appeal/admin/search?q=${query}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getNotificationByUserId = async(userId) => {
   try {
      const response = await api.get(`/notifications/getByUser/${userId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getNotificationsByAppealId = async(appealId) => {
   try {
      const response = await api.get(`/notifications/getByAppeal/${appealId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getFilesByAppeal = async(appealId) => {
   try {
      const response = await api.get(`/files/get/${appealId}`)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const getAllSubmittedAppeals = async() => {
   try {
      const response = await api.get(`/appeal/getAllSubmitted`)
      console.log(response)
      return response.data
   } catch (err) {
      console.log(err)
   }
}

export const checkClaimNumber = async(claimNumber) => {
   try {
      const response = await api.get(`/appeal/checkClaimNumber`, { params: { claimNumber } })
      if (response.data.length > 0) {
         return true
      } else {
         return false
      }
   } catch (err) {
      console.log(err)
   }
}

export const getAppealLetter = async(appealId) => {
   try {
      const response = await api.get(`/appealLetter/get/${appealId}`)
      console.log(response)
      return response.data[0]
   } catch (err) {
      console.log(err)
   }
}


