import { LOGIN_SUCCESS,SET_OLD_PASS,UPDATE_ACTIVE_USER } from "./auth.types";

const defaultState = {
  activeUser: null,
  oldPassword:''
};

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, activeUser: action.payload }; // add your logic here
    }
    case UPDATE_ACTIVE_USER:
      return {...state,activeUser: action.payload};
    case SET_OLD_PASS:
      return {...state,oldPassword:action.payload}
    default:
      return state;
  }
}

export default authReducer;