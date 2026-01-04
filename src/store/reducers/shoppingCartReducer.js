import {
  SET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  SET_PAYMENT,
  SET_ADDRESS,
  CLEAR_CART,
} from '../actionTypes';

// LocalStorage'dan sepeti yükle
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

// LocalStorage'a sepeti kaydet
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = {
  cart: loadCartFromLocalStorage(),
  payment: null,
  address: null,
};

export default function shoppingCartReducer(state = initialState, action) {
  let newCart;
  
  switch (action.type) {
    case SET_CART:
      newCart = action.payload;
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };

    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(
        item => item.product.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Ürün zaten sepette var, count'u artır
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          count: updatedCart[existingItemIndex].count + 1,
        };
        saveCartToLocalStorage(updatedCart);
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Yeni ürün, sepete ekle
        newCart = [
          ...state.cart,
          {
            count: 1,
            checked: true,
            product: action.payload,
          },
        ];
        saveCartToLocalStorage(newCart);
        return {
          ...state,
          cart: newCart,
        };
      }

    case REMOVE_FROM_CART:
      newCart = state.cart.filter(item => item.product.id !== action.payload);
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };

    case TOGGLE_CART_ITEM:
      newCart = state.cart.map(item =>
        item.product.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };

    case INCREASE_CART_ITEM:
      newCart = state.cart.map(item =>
        item.product.id === action.payload
          ? { ...item, count: item.count + 1 }
          : item
      );
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };

    case DECREASE_CART_ITEM:
      newCart = state.cart.map(item =>
        item.product.id === action.payload
          ? { ...item, count: Math.max(1, item.count - 1) }
          : item
      );
      saveCartToLocalStorage(newCart);
      return {
        ...state,
        cart: newCart,
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    case CLEAR_CART:
      saveCartToLocalStorage([]);
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}
