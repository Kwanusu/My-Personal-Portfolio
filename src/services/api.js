import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
});

export const sendInquiry = (data) => api.post('/communication/messages/', data);
export const getLogs = () => api.get('/monitoring/logs/'); // Admin only
export default api;