import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const baseURL = Boolean(import.meta.env.VITE_MOCK)
  ? "http://localhost:5174/"
  : "http://localhost:8098/";

export const baseHeaders = {};

export const api = axios.create({
  baseURL,
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
