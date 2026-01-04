import axios from 'axios';

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token'ı header'a ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - token'ı response'dan oku ve güncelle
api.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
