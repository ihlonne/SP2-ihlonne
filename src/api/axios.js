import axios from 'axios';

const API_BASE_URL = 'https://v2.api.noroff.dev/';
const API_KEY = import.meta.env.API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
