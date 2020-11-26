 import {SET_EMPLOYEES, SET_SELECTED_EMPLOYEE} from './employee.types';

const defaultState = {
  employees:[],
  selectedEmployee:null
}

export default function employeeReducer(state = defaultState,action){
    switch(action.type){
        case SET_EMPLOYEES:
            return {...state,employees:action.payload}
        case SET_SELECTED_EMPLOYEE:
            return {...state,selectedEmployee:action.payload}
        default:
            return state;
    }
}