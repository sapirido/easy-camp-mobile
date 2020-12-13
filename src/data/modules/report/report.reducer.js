import {SET_REPORT_POINTS,ADD_REPORT_POINT} from './report.types';

const defaultState = {
   reportPoints:[],
   selectedReportPoiny:null
}

export default function reportReducer(state = defaultState,action){
    switch(action.type){
        case SET_REPORT_POINTS:
            return {...state,reportPoints:action.payload}
        case ADD_REPORT_POINT:
            return {...state,reportPoints:[...state.reportPoints,action.payload]}
        default:
          return state;
    }
}