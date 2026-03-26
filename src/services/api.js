import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
});

// Request Interceptor: Attach Token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`; // Or 'Bearer' if using JWT
  }
  return config;
});

export const login = (credentials) => api.post('/auth/login/', credentials);
export const sendInquiry = (data) => api.post('/communication/messages/', data);
export const getLogs = () => api.get('/monitoring/logs/'); 

export default api;