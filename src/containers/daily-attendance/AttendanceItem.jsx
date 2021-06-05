import React,{useEffect, useState} from 'react';
import { AttendanceItemWrapper,Name,TrasnportNumber } from './Attendance.styled';
import { AttendanceIconSVG} from '../../common/icons/icons';
import _, { isElement } from 'lodash';


export default function AttendanceItem({children,date,handleUpdateAttendance,isGroup,isMorning,isEnabledChange}){
const [checked,setChecked]  = useState(false);
useEffect(() => {
if(isGroup){
  children?.attendance && children?.attendance[date]?.group ? setChecked(true) :setChecked(false);
}else{
  if(isMorning){
    children?.attendance && children?.attendance[date]?.transport?.morning ? setChecked(true) : setChecked(false);
  }else{
    children?.attendance && children?.attendance[date]?.transport?.noon ? setChecked(true) : setChecked(false);
  }
}
},[isGroup,date])

function handleClicked(){
  handleUpdateAttendance(children.id,!checked);
  setChecked(!checked);
}

const isArrived = !isGroup && isMorning && children?.selfTransports?.[date]?.arrived;
const isCollect = !isGroup && !isMorning && children?.selfTransports?.[date]?.collect;
const isNotNeedToCome = !isGroup && !isMorning && !children?.selfTransports?.[date]?.arrived && !children?.attendance?.[date]?.transport?.morning
return(
    <AttendanceItemWrapper disabled={isArrived || isCollect} isNotNeedToCome={isNotNeedToCome}>
    <TrasnportNumber>תחנה מס׳ {children?.transport || 'לא קיים'}</TrasnportNumber>
    <Name>
    {`${children.childrenName} ${children.familyName}`}
    </Name>
    <span onClick={() => isEnabledChange && !(isArrived || isCollect || isNotNeedToCome) ?  handleClicked() : {}}>
    <AttendanceIconSVG checked={checked} />
    </span>
    </AttendanceItemWrapper>
)

}
