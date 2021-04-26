import {ADD_CAMP,SET_CAMPS, SET_SELECTED_CAMP,SET_SELECTED_CHILD} from './camp.types';
import {storeCamp,getCamps,editCampMananger,editInstruction,editChildren,getChild} from './camp.service';
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

export function setSelectedCampByInstruction(camps,instructionId){
    const selectedCamp = camps?.find(camp => {
       return (camp.instructions.filter(instruction => instruction.id === instructionId)).length
    });
    console.log({selectedCamp})
    return{
        type:SET_SELECTED_CAMP,
        payload:selectedCamp
    }
}

export  function getChildById(childId){
    return async function _(dispatch) {
        try{
        const child = await getChild(childId);
        dispatch(setSelectedChild(child));
        } catch(err){
            console.log({err});
        }
    }
}

export function setSelectedChild(child){
    return {
        type:SET_SELECTED_CHILD,
        payload:child
    }
}