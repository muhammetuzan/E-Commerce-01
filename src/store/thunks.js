import { setRoles, setFetchState, setUser, setCategories, setTotal, setProductList, setProductDetail } from './actions';
import api from './api';

export const fetchRoles = () => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  
  try {
    const response = await api.get('/roles');
    dispatch(setRoles(response.data));
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Error fetching roles:', error);
    dispatch(setFetchState('FAILED'));
  }
};

export const fetchCategories = () => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  
  try {
    const response = await api.get('/categories');
    console.log('Categories fetched:', response.data);
    dispatch(setCategories(response.data));
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch(setFetchState('FAILED'));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await api.post('/login', { email, password });
    const { token, name, email: userEmail, role_id } = response.data;
    
    console.log('Login response:', { token, name, email: userEmail, role_id });
    
    // User info'yu Redux'a kaydet
    dispatch(setUser({
      name,
      email: userEmail,
      role_id,
      token,
    }));

    // Token'ı localStorage'a kaydet (remember me için)
    if (response.data.token) {
      console.log('Saving token to localStorage:', token);
      localStorage.setItem('token', token);
      console.log('Token saved. Checking localStorage:', localStorage.getItem('token'));
    }

    return response.data; // LoginModal'a response dön
  } catch (error) {
    throw error; // Error handling için throw et
  }
};

export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('No token found in localStorage');
    return null;
  }

  try {
    console.log('Verifying token with /verify endpoint');
    const response = await api.get('/verify');
    
    console.log('Token verified, user data:', response.data);
    
    // User info'yu Redux'a kaydet
    dispatch(setUser({
      name: response.data.name,
      email: response.data.email,
      role_id: response.data.role_id,
      token: localStorage.getItem('token'), // Token'ı localStorage'dan oku
    }));

    // localStorage'da user'ı da kaydet
    localStorage.setItem('user', JSON.stringify({
      name: response.data.name,
      email: response.data.email,
      role_id: response.data.role_id,
      token: localStorage.getItem('token'),
    }));

    return response.data;
  } catch (error) {
    console.error('Token verification failed:', error);
    
    // Token geçersizse localStorage'dan sil
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return null;
  }
};

export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  
  try {
    const { limit, offset, ...otherParams } = params;
    
    const queryParams = {
      limit: limit || 25,
      offset: offset || 0,
      ...otherParams,
    };
    
    console.log('🚀 fetchProducts - Params gönderiliyor:', queryParams);
    
    const response = await api.get('/products', { params: queryParams });
    
    console.log('📦 API Response Status:', response.status);
    console.log('📦 API Response Data:', response.data);
    
    const { total, products } = response.data;
    
    console.log('✅ Total ürün:', total, '| Gelen ürün sayısı:', products?.length || 0);
    
    dispatch(setTotal(total));
    dispatch(setProductList(products));
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState('FAILED'));
  }
};

export const fetchProductDetail = (productId) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  
  try {
    const response = await api.get(`/products/${productId}`);
    
    console.log('✅ Product detail fetched:', response.data);
    
    dispatch(setProductDetail(response.data));
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Error fetching product detail:', error);
    dispatch(setFetchState('FAILED'));
  }
};

export const fetchBestsellers = () => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  
  try {
    // Tüm ürünleri getir (limit yüksek ayarla)
    const response = await api.get('/products', { 
      params: { limit: 100, offset: 0 } 
    });
    
    const { products } = response.data;
    
    // Rating'e göre sırala (yüksekten düşüğe) ve ilk 8'i al (mobile 4 + desktop 4)
    const bestsellerProducts = (products || [])
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 8);
    
    console.log('✅ Bestseller products fetched:', bestsellerProducts);
    
    dispatch(setFetchState('FETCHED'));
    return bestsellerProducts;
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    dispatch(setFetchState('FAILED'));
    return [];
  }
};
