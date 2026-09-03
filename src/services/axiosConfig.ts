import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

export interface ApiRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

// points at the local api by default - that is where `npm run dev` inside
// backend/ serves it. Override with VITE_API_URL if the api runs elsewhere.
const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: ApiRequestConfig) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized request (Guest user or expired session)");
    }
    
    return Promise.reject(error);
  }
);

export default api;
