import React,{useState} from 'react';
import { AttendanceItemWrapper,Name,TrasnportNumber } from './Attendance.styled';
import { AttendanceIconSVG} from '../../common/icons/icons';
import moment from 'moment';

export default function AttendanceItem({children,date,handleUpdateAttendance}){
const [checked,setChecked]  = useState(children?.attendance?.[moment(date || Date.now()).format('DD-MM-YYYY')] ||children.attended);

function handleClicked(){
  handleUpdateAttendance(children.id,!checked);
  setChecked(!checked);
}
return(
    <AttendanceItemWrapper>
    <TrasnportNumber>תחנה מס׳ {children?.transport || 'לא קיים'}</TrasnportNumber>
    <Name>
    {`${children.childrenName} ${children.familyName}`}
    </Name>
    <span onClick={() => handleClicked()}>
    <AttendanceIconSVG checked={checked} />
    </span>
    </AttendanceItemWrapper>
)

}