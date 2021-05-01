import {SET_PUBLISHED_FEEDBACK,SET_SELECTED_FEEDBACK} from './feedback.types'

const INITAL_STATE = {
    publishedFeedbacks:[],
    selectedFeedback:null
}


export default function feedbackReducer(state = INITAL_STATE,action){

    switch(action.type){
      
        case SET_PUBLISHED_FEEDBACK:
            return {...state,publishedFeedbacks:action.payload}
        case SET_SELECTED_FEEDBACK:
            return {...state , selectedFeedback: action.payload}
        default:
            return state;
    }
}