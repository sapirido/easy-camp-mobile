import {SET_MASTER_CAMP, SET_ALL_MASTER_CAMPS, SET_TRANSPORT_LIST} from './masterCamp.types'

const INITAL_STATE = {
    masterCamps:[],
    selectedMasterCamp:null,
    transportList:[]
}


export default function masterCampReducer(state = INITAL_STATE,action){

    switch(action.type){
        case SET_MASTER_CAMP:
            return{
                ...state,
                selectedMasterCamp:action.paylaod
            }
        case SET_ALL_MASTER_CAMPS:
            return{
                ...state,
                masterCamps:action.payload
            }
        case SET_TRANSPORT_LIST:
            return {...state,transportList:action.payload}
        default:
            return state;
    }
}