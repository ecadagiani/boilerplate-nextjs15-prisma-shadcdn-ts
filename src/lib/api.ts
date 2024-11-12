import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to check client/server context
api.interceptors.request.use((config) => {
  // Check if code is running on client side
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    throw new Error(
      'API instance cannot be used on client side. This instance is for server-side calls only.'
    );
  }
  return config;
});

export default api;
