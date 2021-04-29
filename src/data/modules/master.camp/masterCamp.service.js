import { getMasterCamps,getAllTransport } from '../../../fb';

export async function getRootCamps(){

const allCampsObj = await getMasterCamps();
return Object.values(allCampsObj);
}

export async function getTransportList(){
const allTransports = await getAllTransport();
return Object.values(allTransports);
}