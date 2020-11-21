import {ADD_CAMP} from './camp.types';
import {storeCamp} from './camp.service';

function addCamp(camp){
    return{
        type:ADD_CAMP,
        payload:camp
    }
}

export function saveCamp(camp){
    return async function _(dispatch){
        try{
            await storeCamp(camp);
            dispatch(addCamp(camp));
            return true;
        }catch(err){
            console.error(err);
            return false;
        }
    }
}