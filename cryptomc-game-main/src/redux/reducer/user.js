import {
  USER_DATA,
  CLEAR_DATA,
  LOADING,
  BYKE_SELECT,
  SHOW_BYKE,
} from "../constanst/index";

const initialState = {
  userData: false,
  loading: false,
  bykeSelect: false,
  showByke: false
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case BYKE_SELECT:
      return {
        ...state,
        bykeSelect: action.bykeSelect,
      };
    case SHOW_BYKE:
      return{
        ...state,
        showByke: action.showByke
      };
    case CLEAR_DATA:
      return initialState;

    default:
      return state;
  }
};
