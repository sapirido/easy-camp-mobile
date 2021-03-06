import { getAllContactList, getCampContactList, getEmployeesContactList, getGroupContactList, getCampChilds } from './contact.service';
import { SET_CONTACTS } from './contact.types';

export function setContacts(contacts){
return {
    type: SET_CONTACTS,
    payload: contacts
}
}

export function getEmployeesContacts(){
    return async function _(dispatch){
        const contacts = await getEmployeesContactList();
        dispatch(setContacts(contacts));
    }
}

export function getGroupContacts(campId,instructionId){
    return async function _(dispatch){
        const contacts = await getGroupContactList(campId,instructionId);
        console.log({contacts});
        dispatch(setContacts(contacts));
    }
}

export function getTransportContacts(transportList){
    return async function _(dispatch){
        const contacts = await getAllContactList(transportList);
        dispatch(setContacts(contacts));
    }
}

export function getCampContacts(campId){
    return async function _(dispatch){
        const contacts = await getCampChilds(campId);
        dispatch(setContacts(contacts));
    }
}

export function getAllContacts(){
    return async function _(dispatch){
        const contacts = await getAllContactList();
        dispatch(setContacts(contacts));
    }
}

export function getCampChildren(campId){
    return async function _(dispatch){
        const childrens = await getCampChilds(campId);
        dispatch(setContacts(childrens));
    }
}