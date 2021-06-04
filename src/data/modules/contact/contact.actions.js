import { getAllContactList, getCampContactList, getEmployeesContactList, getGroupContactList } from './contact.service';
import { SET_CONTACTS } from './contact.types';

function setContacts(contacts){
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
    console.log({campId,instructionId});
    return async function _(dispatch){
        const contacts = await getGroupContactList(campId,instructionId);
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
        const contacts = await getCampContactList(campId);
        dispatch(setContacts(contacts));
    }
}

export function getAllContacts(){
    return async function _(dispatch){
        const contacts = await getAllContactList();
        dispatch(setContacts(contacts));
    }
}