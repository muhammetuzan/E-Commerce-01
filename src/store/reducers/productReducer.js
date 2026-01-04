import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_PRODUCT_DETAIL,
  SET_TOTAL,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_CATEGORY,
  SET_SORT,
  SET_FETCH_STATE,
} from '../actionTypes';

const initialState = {
  categories: [],
  productList: [],
  productDetail: null,
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  category: null,
  sort: '',
  fetchState: 'NOT_FETCHED', // NOT_FETCHED, FETCHING, FETCHED, FAILED
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case SET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };

    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload,
      };

    default:
      return state;
  }
}
