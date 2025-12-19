import axios from "axios";

// Lấy baseURL từ .env hoặc mặc định localhost
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Tạo axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Hàm tiện ích để set token
export function setToken(token) {
  if (token) {
    localStorage.setItem("access_token", token);
  } else {
    localStorage.removeItem("access_token");
  }
}

// Request interceptor: tự động gắn JWT nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: xử lý lỗi xác thực
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc sai → xóa và chuyển về login
      setToken(null);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;