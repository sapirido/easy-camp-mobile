import {ADD_CAMP,SET_CAMPS} from './camp.types';
import {storeCamp,getCamps,editCampMananger,editInstruction,editChildren} from './camp.service';

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

function setCamps(allCamps){
return{
    type:SET_CAMPS,
    payload:allCamps
 }
}

export function getAllCamps(){
    return async function _(dispatch){
        try{
            const allCamps = await getCamps();
            dispatch(setCamps(allCamps));
        }catch(err){
            console.error(err);
        }
    }
}

export function setCampManager(campId,managerId,updatedData){
    return async function _(dispatch){
        try{
            await editCampMananger(campId,managerId,updatedData);
            const allCamp = await getCamps();
            dispatch(setCamps(allCamp));
        }catch(err){
            console.error(err);
        }
    }
}

export function setInstruction(camp,instructionId,updatedData){
    return async function _(dispatch){
        try{
            await editInstruction(camp,instructionId,updatedData);
            const allCamps = await getCamps();
            dispatch(setCamps(allCamps));
        }catch(err){
            console.error(err);
        }
    }
}

export function setChildren(camp,childrenId,updatedData){
    return async function _(dispatch){
        try{
            await editChildren(camp,childrenId,updatedData);
            const allCamp = await getCamps();
            dispatch(setCamps(allCamp));
        }catch(err){
            console.error(err);
        }
    }
}


