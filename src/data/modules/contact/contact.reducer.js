import { SET_CONTACTS } from "./contact.types";

const DEFAULT_STATE = {
    contacts:[]
}

export default function contactReducer(state = DEFAULT_STATE, action){

    switch(action.type){
        case SET_CONTACTS:
          return {...state, contacts: action.payload};
        default:
            return state;
    }
}