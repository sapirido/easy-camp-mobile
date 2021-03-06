import {ADD_CAMP, SET_CAMPS,SET_INSTRUCTIONS,SET_SELECTED_CAMP, SET_SELECTED_CHILD} from './camp.types';

const defaultState = {
    camps:[],
    instructions:[],
    selectedCamp:null,
    selectedChild:null
}

export default function campReducer(state = defaultState,action){
    switch(action.type){

       case ADD_CAMP:
           return {...state,camps:[...state.camps,action.payload]}
       case SET_CAMPS:
           return {...state,camps:action.payload};
        case SET_SELECTED_CAMP:
            return {...state,selectedCamp:action.payload}
        case SET_SELECTED_CHILD:
            return { ...state,selectedChild:action.payload}
        case SET_INSTRUCTIONS:
            return { ...state, instructions: action.payload }
        default:
            return state;
    }
}