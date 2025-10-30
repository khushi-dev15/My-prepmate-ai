// frontend/src/API/api.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://prepmate-ai-bknd.onrender.com", // ✅ Correct backend base API
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
