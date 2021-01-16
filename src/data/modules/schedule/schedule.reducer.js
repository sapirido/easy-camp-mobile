import {SET_ALL_DAYS, SET_DAILY} from './schedule.types';

const defaultState = {
  allDays:[],
  selectedDailyCalander:null,
  today:'2021-07-01'
}

export default function scheduleReducer(state = defaultState,action){
    switch(action.type){
        case SET_ALL_DAYS:
            return {...state,allDays:action.payload}
        case SET_DAILY:
            return {...state,selectedDailyCalander:action.payload}
        default:
            return state;
    }
}