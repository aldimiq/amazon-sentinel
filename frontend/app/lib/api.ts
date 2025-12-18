import axios from 'axios';

// Access the environment variable. 
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

console.log("🛠️ NEXT_PUBLIC_API_URL is set to:", process.env.NEXT_PUBLIC_API_URL);
console.log("📡 Axios Base URL:", API_URL);

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptor to attach token if we have one
import { useAuthStore } from '../store/auth';

api.interceptors.request.use((config) => {
  console.log(`📡 [API Request] ${config.method?.toUpperCase()} ${config.url}`);
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API Response] ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ [API Error] ${error.response?.status || 'Network Error'} from ${error.config?.url}`);
    return Promise.reject(error);
  }
);
