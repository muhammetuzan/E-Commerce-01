import {
  ADD_TO_LIKED,
  REMOVE_FROM_LIKED,
  SET_LIKED,
} from '../actionTypes';

// LocalStorage'dan beğenilenler listesini yükle
const loadLikedFromLocalStorage = () => {
  try {
    const savedLiked = localStorage.getItem('liked_products');
    if (savedLiked) {
      return JSON.parse(savedLiked);
    }
  } catch (error) {
    console.error('Error loading liked from localStorage:', error);
  }
  return [];
};

// LocalStorage'a beğenilenler listesini kaydet
const saveLikedToLocalStorage = (liked) => {
  try {
    localStorage.setItem('liked_products', JSON.stringify(liked));
  } catch (error) {
    console.error('Error saving liked to localStorage:', error);
  }
};

const initialState = {
  liked: loadLikedFromLocalStorage(),
};

export default function likedReducer(state = initialState, action) {
  let newLiked;

  switch (action.type) {
    case SET_LIKED:
      newLiked = action.payload;
      saveLikedToLocalStorage(newLiked);
      return {
        ...state,
        liked: newLiked,
      };

    case ADD_TO_LIKED:
      // Aynı ürün zaten beğenilmişse ekleme
      if (state.liked.find(item => item.id === action.payload.id)) {
        return state;
      }
      newLiked = [...state.liked, action.payload];
      saveLikedToLocalStorage(newLiked);
      return {
        ...state,
        liked: newLiked,
      };

    case REMOVE_FROM_LIKED:
      newLiked = state.liked.filter(item => item.id !== action.payload);
      saveLikedToLocalStorage(newLiked);
      return {
        ...state,
        liked: newLiked,
      };

    default:
      return state;
  }
}
