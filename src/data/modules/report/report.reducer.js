import { ADD_REPORT_POINT, SET_REPORT_POINTS, SET_SELECTED_REPORT } from './report.types';

const defaultState = {
   reportPoints:[],
   selectedReport:null,
   selectedParentReports:[],
}

export default function reportReducer(state = defaultState,action){
    console.log({action,state});
    switch(action.type){
        case SET_REPORT_POINTS:
            return {...state,reportPoints:action.payload}
        case ADD_REPORT_POINT:
            return {...state,reportPoints:[...state.reportPoints,action.payload]}
        case SET_SELECTED_REPORT:
            return {...state,selectedReport:action.payload}
        default:
          return state;
    }
}