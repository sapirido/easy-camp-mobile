
import {updateChildrenAttendance} from './attendace.service';

export function updateChildrensAttendance(date,childrens,isGroup){

    return async function _(){
        childrens.forEach(async children => {
            await updateChildrenAttendance(date,children.id,!!children.attended,isGroup);
        })
    }

}