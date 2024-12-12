import { ensureClient } from "@/utils/ensureRuntime";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  ensureClient("API call");
  return config;
});

export default api;
