"use client";

import { API } from "@/utils/config";
import axios from "axios";
import { API } from './api'

const axiosRequest = axios.create({
  baseURL: API
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJjYjVjOWE2NS0xMjJhLTQ1NDktYmEzOS03YTFmNmU5N2JjY2YiLCJuYW1lIjoiYWxpam9uIiwiZW1haWwiOiJhbGlAZ21haWwuY29tIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTc1MjY0NTc0NywiaXNzIjoiaW5zdGFncmFtLWdyb3VwIiwiYXVkIjoiaW5zdGFncmFtLWFwaSJ9.m3yNuC8FAObCmo5E57gLFMPt8FzylnH7H4bP0Hp8alw'
// 🔐 Илова кардани токен ба ҳар запрос
axiosRequest.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Агар токен нодуруст ё 401 шавад — logout ва гузаштан ба login
axiosRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosRequest;
