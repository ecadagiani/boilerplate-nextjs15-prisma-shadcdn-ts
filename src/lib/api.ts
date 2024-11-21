import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // const session = await getSession();
    // console.log("api request session", session)
    // if (session) {
    //   config.headers.Authorization = `Bearer ${session.accessToken}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
