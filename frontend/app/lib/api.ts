import axios from 'axios';

// Access the environment variable. 
// Note: In Next.js client-side, this must start with NEXT_PUBLIC_
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptor to attach token if we have one
import { useAuthStore } from '../store/auth';

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
