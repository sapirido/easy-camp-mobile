import {saveCamp,saveEmpolyee,saveChildren,getAllCamps,updateCampManager,updateInstruction,updateChildren,getChildById,getCampInstructions,getCampById} from '../../../fb';

export async function storeCamp(camp){

    const employees = [camp.camp_manager,...camp.instructions];
    const childrens = [...camp.groups.map(group=>group.childrens)]
    let allChildrens = [];
    childrens.forEach(childrenGroup => {
        allChildrens = [...allChildrens,...childrenGroup];
    })
    console.log(childrens);
    try{
    employees.forEach(employee => {
        saveEmpolyee(employee);
    })
    allChildrens.forEach(children=>{
        saveChildren(children);
    })
    saveCamp(camp);
    }catch(err){
        console.error(err);
    }
}

export async function getCamps(){
    try{
        const allCamps = await getAllCamps();
        if(allCamps){
            return allCamps;
        }
    }catch(err){
        console.error(err);
    }
}

export async function editCampMananger(campId,managerId,updatedData){
    try{
       await updateCampManager(managerId,campId,updatedData);
    }catch(err){
        console.error(err);
    }
}

export async function editInstruction(camp,instructionId,updatedData){
    try{
        let updatedCamp = camp;
        updatedCamp.groups = updatedCamp.groups.map(group =>{
          return group.instruction.id === instructionId ? {
          ...group,
          instruction:{
            ...updatedData
          } 
          } : group;
        })
        updatedCamp.instructions = updatedCamp.instructions.map(instruction => {
          return instruction.id === instructionId ? {
            ...updatedData
          } : instruction;
        })
        await updateInstruction(updatedCamp,instructionId,updatedData);
    }catch(err){
        console.error(err);
    }
}

export async function editChildren(camp,childrenId,updatedData){
    try{
        let updatedCamp = camp;
        updatedCamp.groups = updatedCamp.groups.map(group =>{
            let updatedGroup = group;
            group.childrens = updatedGroup.childrens.map(children =>{
                return children.id === childrenId ? {
                    ...updatedData
                } : children;
            })
            return updatedGroup;
        })
        await updateChildren(updatedCamp,childrenId,updatedData);
    }catch(err){
        console.error(err);
    }
}

export async function getChild(childeId){
    try{
        return await getChildById(childeId);
    }catch (err) {
        throw new Error('can not fetch childId',err);
    }
}

export async function getInstructions(campId){
return await getCampInstructions(campId);
}

export async function getSelectedCampById(campId){
    return await getCampById(campId);
}