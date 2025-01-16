import axios from "axios";
import { getTokens, saveTokens, deleteTokens } from "./tokenStorage";

const api = axios.create({
   baseURL: "http://100.83.45.96:4001/api"
});


api.interceptors.request.use(
   async (config) => {
      const tokens = await getTokens()
      if (tokens?.accessToken) {
         config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
)

api.interceptors.response.use(
   (response) => response, // Pass through successful responses
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         const tokens = await getTokens();
         if (tokens?.refreshToken) {
            try {
               const response = await api.post("/refresh", { refreshToken: tokens.refreshToken })
               const { accessToken, refreshToken } = response.data

               await saveTokens(accessToken, refreshToken)
               originalRequest.headers.Authorization = `Bearer ${accessToken}`
               return api(originalRequest)
            } catch (refreshError) {
               await deleteTokens()
               console.error("Token refresh failed:", refreshError)
            }
         }
      }

      return Promise.reject(error)
   }
);

export default api