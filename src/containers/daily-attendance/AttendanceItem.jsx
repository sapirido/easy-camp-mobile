import React,{useState} from 'react';
import { AttendanceItemWrapper,Name,TrasnportNumber } from './Attendance.styled';
import { AttendanceIconSVG} from '../../common/icons/icons';


export default function AttendanceItem({children,date,handleUpdateAttendance,isGroup,isMorning,isEnabledChange}){
  console.log({date})
const [checked,setChecked]  = useState(isGroup ? !!children?.attendance[date]?.group : isMorning ?  !!children?.attendance[date]?.transport?.morning : !!children.attendance[date]?.transport?.noon );

function handleClicked(){
  handleUpdateAttendance(children.id,!checked);
  setChecked(!checked);
}
console.log(isMorning ?  !!children?.attendance[date]?.transport?.morning : !!children.attendance[date]?.transport?.noon);
return(
    <AttendanceItemWrapper>
    <TrasnportNumber>תחנה מס׳ {children?.transport || 'לא קיים'}</TrasnportNumber>
    <Name>
    {`${children.childrenName} ${children.familyName}`}
    </Name>
    <span onClick={() => isEnabledChange ?  handleClicked() : {}}>
    <AttendanceIconSVG checked={checked} />
    </span>
    </AttendanceItemWrapper>
)

}