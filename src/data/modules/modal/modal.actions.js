import {CLOSE_MODAL,SET_MODAL_STATE} from './modal.types';

export function setModalState(modalState){
  return{
    type:SET_MODAL_STATE,
    payload:modalState
  }
}

export function closeModal(){
  return{
    type:CLOSE_MODAL
  }
}