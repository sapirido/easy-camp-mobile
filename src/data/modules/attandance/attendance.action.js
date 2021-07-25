
import { getGroupContact } from '../../../fb';
import { updateChildrenAttendance } from './attendace.service';

export function updateChildrensAttendance(campId,instructionId,date,childrens,isGroup,isMorning){

    return async function _(){
        if(isGroup){
            let groupNumber;
            const groupList = await getGroupContact(campId);
             Object.values(groupList).forEach((group,index) => {
                if(group.instruction?.id === instructionId){
                    groupNumber = index;
                }
            });
            let index = 0;
            for(let child of childrens){
                const attended = !!child.attended || !!child?.attendance?.[date]?.group;
                await updateChildrenAttendance(campId,instructionId,date,child.id,index,!!attended,isGroup,groupNumber);
                index = index + 1;
            }
        }else{
            childrens.forEach(async (children,index) => {
                const attended = !!children.attended;
                await updateChildrenAttendance(campId,instructionId,date,children.id,index,!!attended,isGroup,false,isMorning);
            })
        }
    }

}