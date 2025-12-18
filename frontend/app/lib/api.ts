import axios from 'axios';

// Access the environment variable. 
// Access the environment variable. 
const getApiUrl = () => {
  let url = process.env.NEXT_PUBLIC_API_URL?.trim() || '';
  if (!url) return 'http://127.0.0.1:8001';

  try {
    new URL(url);
    return url;
  } catch (e) {
    console.warn(`⚠️ Invalid NEXT_PUBLIC_API_URL "${url}", falling back to default.`);
    return 'http://127.0.0.1:8001';
  }
};

const API_URL = getApiUrl();

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
    const url = error.config?.url || 'UNKNOWN URL';
    const status = error.response?.status || 'Network Error';
    console.error(`❌ [API Error] ${status} from ${url}`, error);
    return Promise.reject(error);
  }
);
