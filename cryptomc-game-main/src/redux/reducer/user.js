import {
  USER_DATA,
  CLEAR_DATA,
} from "../constanst/index";

const initialState = {
  userData: false,
  
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };

    case CLEAR_DATA:
      return initialState;

    default:
      return state;
  }
};
