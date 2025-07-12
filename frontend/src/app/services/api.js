import axios from "axios";

const API_BASE_URL = "https://appeals-ekh0d0g4csgcbdfg.westus-01.azurewebsites.net/api";

export const api = axios.create({
   baseURL: API_BASE_URL,
   withCredentials: true
})