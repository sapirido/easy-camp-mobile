
import {updateChildrenAttendance} from './attendace.service';
import {getGroupContactList} from '../contact/contact.service';
import { getGroupContact } from '../../../fb';

export function updateChildrensAttendance(campId,instructionId,date,childrens,isGroup,isMorning){

    return async function _(){
        if(isGroup){
            let groupNumber;
            const groupList = await getGroupContact(campId);
             Object.values(groupList).forEach((group,index) => {
                 console.log({index});
                if(group.instruction?.id === instructionId){
                    groupNumber = index;
                }
            });
            return childrens.forEach(async (children,index) => {
                const attended = !!children.attended || children?.attendance[date]?.group;
                await updateChildrenAttendance(campId,instructionId,date,index,!!attended,isGroup,groupNumber);
            })
        }else{
            childrens.forEach(async children => {
                const attended = !!children.attended || children?.attendance[date].transport;
                await updateChildrenAttendance(campId,instructionId,date,children.id,!!attended,isGroup,false,isMorning);
            })
        }
    }

}