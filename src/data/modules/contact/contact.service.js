import {getAllContact,getGroupContact,getCampList,getChildrensContanct,getEmployeesContact} from '../../../fb';

export async function getEmployeesContactList(){
        const employeeList = await getEmployeesContact()
        if(employeeList){
            return Object.values(employeeList);
        }
        return [];
}

export async function getGroupContactList(campId,instructionId){
    const groupList = await getGroupContact(campId,instructionId);
    console.log({groupList})
    const selectedGroup = groupList.find(group => group.instruction.id === '121212125');
    if(selectedGroup?.childrens){
        return Object.values(selectedGroup.childrens);
    } 
    return [];
}

export async function getTransportContactList(transportId){
    const childrenList = await getChildrensContanct();
    console.log({childrenList,transportId})
    const transportChildrens = Object.values(childrenList).filter(child => child.transportId === transportId);
    if(transportChildrens.length){
        return transportChildrens;
    }
    return [];
}

export async function getCampContactList(campId){
    const campList = await getCampList(campId);
    console.log({campList})
    let groups = [];
    campList.forEach(group => groups = [...groups,...group.childrens,group.instruction])
    if(groups.length){
        return Object.values(groups);
    }
    return [];
}

export async function getAllContactList(){
    const allContactList = await getAllContact();
    if(allContactList){
        return Object.values(allContactList);
    }
    return [];
}