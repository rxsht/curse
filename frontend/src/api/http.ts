import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api/v1",
  timeout: 8000,
  withCredentials: true
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config as typeof error.config & { _retry?: boolean };
    if (error.response?.status === 401 && !original?._retry && useAuthStore.getState().refreshToken) {
      original._retry = true;
      const refresh = await axios.post(`${http.defaults.baseURL}/auth/refresh`, { refreshToken: useAuthStore.getState().refreshToken });
      useAuthStore.getState().setTokens(refresh.data.accessToken, refresh.data.refreshToken, useAuthStore.getState().user);
      original.headers.Authorization = `Bearer ${refresh.data.accessToken}`;
      return http(original);
    }
    const silent = original?.headers?.["x-silent-error"] === "1";
    if (!silent) {
      const message = error.response?.data?.error || "API error";
      toast.error(typeof message === "string" ? message : "API error");
    }
    return Promise.reject(error);
  }
);
