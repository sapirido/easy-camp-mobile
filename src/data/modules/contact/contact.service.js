import {getAllContact,getGroupContact,getCampList,getChildrensContanct,getEmployeesContact} from '../../../fb';
import { isEmpty } from 'lodash';

export async function getEmployeesContactList(){
        const employeeList = await getEmployeesContact()
        if(employeeList){
            return Object.values(employeeList);
        }
        return [];
}

export async function getGroupContactList(campId,instructionId){
    const groupList = await getGroupContact(campId);
    console.log({groupList});
    const selectedGroup = !isEmpty(groupList) && !isEmpty(Object.values(groupList).filter(Boolean)) && Object.values(groupList).filter(Boolean).find(group => group.instruction?.id === instructionId);
    console.log({selectedGroup});
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
    console.log(typeof campList[0])
    (campList || []).forEach(group => groups = [...groups,...group.childrens,group.instruction])
    if(groups.length){
        return Object.values(groups);
    }
    return [];
}

export async function getAllContactList(transportList = null){
    const allContactList = await getAllContact();
    if(transportList?.length && allContactList){
        const transportChildrens = Object.values(allContactList).filter(children => transportList.includes(children.transport?.toString()));
        return transportChildrens;
    }
    if(allContactList){
        return Object.values(allContactList);
    }
    return [];
}

export async function getCampChilds(campId){
    const campGroups = await getCampList(campId);
    const childs = campGroups.reduce(([],group) => group.childrens,[])
    if(typeof childs === 'object'){
        const childrens = Object.values(childs).filter(child => !!child.id);
        return childrens;
    }
    return childs.filter(child => !!child.id);
}
