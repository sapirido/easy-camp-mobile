import {SET_REPORT_POINTS,ADD_REPORT_POINT,SET_SELCTED_PARENT_REPORTS} from './report.types';

const defaultState = {
   reportPoints:[],
   selectedReportPoint:null,
   selectedParentReports:[],
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