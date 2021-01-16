import { LOGIN_SUCCESS,UPDATE_ACTIVE_USER } from "./auth.types";

const defaultState = {
  activeUser: null
};

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, activeUser: action.payload }; // add your logic here
    }
    case UPDATE_ACTIVE_USER:
      return {...state,activeUser: action.payload};
    default: {
      return state;
    }
  }
}

export default authReducer;