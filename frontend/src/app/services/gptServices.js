import axios from "axios";
import { api } from "./api";

const API_BASE_URL = "http://localhost:8080/api";

export const extractAppealDetails = async (files) => {
   try {
      const formData = new FormData()
      console.log("gpt files", files)
      files.forEach((item, index) => {
         console.log(item.file)
         formData.append(`file${index}`, item.file)
      })

      console.log(formData)

      const response = await api.post(`/gpt/extractData`, formData)
      console.log()
      return {content: response.data.content, usage: response.data.usage}
   } catch (error) {
      if (error.response && error.response.data) {
      // Throw the actual error payload from the server (e.g., { error: "Limit reached" })
         throw error.response.data;
      }
      // If there's no specific server response, throw a generic error.
      throw new Error("An unexpected network error occurred.");   
   }
}

export const writeAppealLetter = async(inputs, documents = []) => {
   try {
      const formData = new FormData();
      formData.append("inputs", JSON.stringify(inputs));
      documents.forEach((doc) => formData.append("documents", doc)); // actual File objects

      const response = await api.post(`/gpt/writeLetter`, formData, {
         headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("response", response)

      const usage = response.data.usage
      const base64 = response.data.pdf;

      const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const blob = new Blob([binary], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const file = new File([blob], "appeal-letter.pdf", {
         type: "application/pdf",
         lastModified: Date.now(),
      });

      console.log(file, url, usage)
      return {file: file, url: url, usage: usage}

   } catch (error) {
      if (error.response && error.response.data) {
      // Throw the actual error payload from the server (e.g., { error: "Limit reached" })
         throw error.response.data;
      }
      // If there's no specific server response, throw a generic error.
      throw new Error("An unexpected network error occurred.");
   }
}

export const chat = async(messages, appealDetails) => {
   try {
      console.log(messages, appealDetails)
      const response = await api.post("/gpt/chat", {messages, appealDetails})

      console.log(response.data)
      return {response: response.data.response, usage: response.data.usage}
   } catch (error) {
      if (error.response && error.response.data) {
      // Throw the actual error payload from the server (e.g., { error: "Limit reached" })
         throw error.response.data;
      }
      // If there's no specific server response, throw a generic error.
      throw new Error("An unexpected network error occurred.");

   }
}

export const getUsageStats = async() => {
   try {
      const response = await api.get(`/gpt/usage`)
      console.log(response)
      return response.data
   } catch (err) {
      console.log(err)
   }
}