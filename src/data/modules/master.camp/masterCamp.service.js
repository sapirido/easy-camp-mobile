import { getMasterCamps } from '../../../fb';

export async function getRootCamps(){

const allCampsObj = await getMasterCamps();
return Object.values(allCampsObj);
}