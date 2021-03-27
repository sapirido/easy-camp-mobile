
import {CLOSE_MODAL,SET_MODAL_STATE} from './modal.types';
const defaultState = {
  modalState:{},
}

export default function modalReducer(state = defaultState,action){

  switch(action.type){
    case SET_MODAL_STATE:
      return {...state,modalState:action.payload};
    case CLOSE_MODAL:
      return {...state,modalState:{}};
    default:
      return state;
  }
}