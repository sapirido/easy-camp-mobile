import {updateAttendance} from '../../../fb';

export async function updateChildrenAttendance(date,childId,attended,isGroup){
try{
return await updateAttendance(date,childId,attended,isGroup);
}catch(err){
    console.log(err);
}
}