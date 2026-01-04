import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_CATEGORY,
  SET_SORT,
  SET_FETCH_STATE,
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
} from './actionTypes';

// CLIENT ACTION CREATORS
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});

export const setCreditCards = (creditCards) => ({
  type: SET_CREDIT_CARDS,
  payload: creditCards,
});

// PRODUCT ACTION CREATORS
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

// SHOPPING CART ACTION CREATORS
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});
