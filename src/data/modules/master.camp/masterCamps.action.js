import {SET_MASTER_CAMP,GET_MASTER_CAMP, SET_ALL_MASTER_CAMPS, SET_TRANSPORT_LIST} from './masterCamp.types';
import { getRootCamps,getTransportList } from './masterCamp.service';

function setAllMasterCamps(camps){
    return{
        type:SET_ALL_MASTER_CAMPS,
        payload:camps,
    }
}

function setTransportList(transportList){
    return {
        type:SET_TRANSPORT_LIST,
        payload:transportList
    }
}

export  function getMasterCamps(){
    return async function _(dispatch){
        const allMasterCamps = await getRootCamps();
        console.log({allMasterCamps})
        dispatch(setAllMasterCamps(allMasterCamps));
    }
}

export function setSelectedMasterCamp(selectedCamp){
    return{
        type:SET_MASTER_CAMP,
        payload:selectedCamp
    }
}

export function getTransportNumbers(){
    return async function _(dispatch){
        const transportList = await getTransportList();
        dispatch(setTransportList(transportList));
    }
}