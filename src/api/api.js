import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com/api',
  timeout: 7000,
});

api.interceptors.request.use((config) => {
  // Bisa inject token di sini kalau pakai Redux
  return config;
});

export default api;
