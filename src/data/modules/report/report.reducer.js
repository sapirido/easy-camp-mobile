import { ADD_REPORT_POINT, SET_REPORT_POINTS, SET_SELECTED_REPORT,SET_WATER_REPORTS } from './report.types';

const defaultState = {
   reportPoints:[],
   selectedReport:null,
   selectedParentReports:[],
   waterReports:[]
}

export default function reportReducer(state = defaultState,action){
    switch(action.type){
        case SET_REPORT_POINTS:
            return {...state,reportPoints:action.payload}
        case ADD_REPORT_POINT:
            return {...state,reportPoints:[...state.reportPoints,action.payload]}
        case SET_SELECTED_REPORT:
            return {...state,selectedReport:action.payload}
        case SET_WATER_REPORTS:
            return {...state,waterReports:[...state.waterReports,{id:action.payload.id,isDrink:action.payload.isDrink}]}
        default:
          return state;
    }
}