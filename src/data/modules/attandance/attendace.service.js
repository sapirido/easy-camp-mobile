import {getGroupContact, updateAttendance} from '../../../fb';

export async function updateChildrenAttendance(campId,instructionId,date,childId,attended,isGroup,selectedGroupNumber,isMorning){
try{

return await updateAttendance(campId,instructionId,date,childId,attended,isGroup,selectedGroupNumber,isMorning);
}catch(err){
    console.log(err);
}
}