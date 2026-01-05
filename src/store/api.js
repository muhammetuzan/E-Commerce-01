import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://workintech-fe-ecommerce.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
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

// Address API calls
export const addressAPI = {
  // Get all addresses
  getAddresses: () => api.get('/user/address'),
  
  // Add new address
  addAddress: (addressData) => api.post('/user/address', addressData),
  
  // Update address
  updateAddress: (addressData) => api.put('/user/address', addressData),
  
  // Delete address
  deleteAddress: (addressId) => api.delete(`/user/address/${addressId}`),
};

// Card API calls
export const cardAPI = {
  // Get all saved cards
  getCards: () => api.get('/user/card'),
  
  // Add new card
  addCard: (cardData) => api.post('/user/card', cardData),
  
  // Update card
  updateCard: (cardData) => api.put('/user/card', cardData),
  
  // Delete card
  deleteCard: (cardId) => api.delete(`/user/card/${cardId}`),
};

// Order API calls
export const orderAPI = {
  // Create new order
  createOrder: (orderData) => api.post('/order', orderData),
  
  // Get all orders for logged in user
  getOrders: () => api.get('/order'),
};

export default api;
