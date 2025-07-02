import axios from "axios";
import { AUTH_CONSTANTS } from "../constants/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

api.interceptors.request.use((config) => {
  const encrypted = sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
  const token = encrypted ? atob(encrypted) : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
      sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
    }
    return Promise.reject(error);
  }
);

export default api;
