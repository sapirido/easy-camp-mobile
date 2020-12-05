import {SET_ALL_DAYS} from './schedule.types';

const defaultState = {
  allDays:[],
  selectedDailyCalander:null
}

export default function scheduleReducer(state = defaultState,action){
    switch(action.type){
        case SET_ALL_DAYS:
            return {...state,allDays:action.payload}
        default:
            return state;
    }
}