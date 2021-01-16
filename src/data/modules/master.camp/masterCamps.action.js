import {SET_MASTER_CAMP,GET_MASTER_CAMP, SET_ALL_MASTER_CAMPS} from './masterCamp.types';
import { getRootCamps } from './masterCamp.service';

function setAllMasterCamps(camps){
    return{
        type:SET_ALL_MASTER_CAMPS,
        payload:camps
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