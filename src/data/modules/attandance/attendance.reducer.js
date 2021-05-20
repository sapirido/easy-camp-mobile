import {SET_ATTENDANCE} from './attendance.types';


const INITIAL_STATE = {
    attendance:[]
}

export default function AttendanceReducer(state = INITIAL_STATE, action){

    switch(action.type){
        case SET_ATTENDANCE:
            return {...state,attendance:action.payload}
        default:
            return state;
    }
}