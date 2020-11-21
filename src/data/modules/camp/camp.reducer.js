import {ADD_CAMP} from './camp.types';

const defaultState = {
    camps:[],
    selectedCamp:null
}

export default function campReducer(state = defaultState,action){
    switch(action.type){

       case ADD_CAMP:
           return {...state,camps:[...state.camps,action.payload]}

        default:
            return state;
    }
}