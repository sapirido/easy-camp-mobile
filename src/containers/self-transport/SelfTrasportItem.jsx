import React, { useEffect,useState } from 'react';
import { AttendanceIconSVG } from '../../common/icons/icons';
import { PRIMARY, WHITE } from '../../common/styles/colors';
import { AttendanceItemWrapper,Name,TrasnportNumber } from '../daily-attendance/Attendance.styled';

export default function({children,date,handleUpdateReport,isArrived}){
    const [checked,setChecked]  = useState(false);

    useEffect(() => {
        if(isArrived){
            console.log( children?.selfTransports , children?.selfTransports?.[date]?.collect)
            children?.selfTransports && children?.selfTransports?.[date]?.collect ? setChecked(true) : setChecked(false)
        }else{
            console.log( children?.selfTransports , children?.selfTransports?.[date]?.arrived)
            children?.selfTransports && children?.selfTransports?.[date]?.arrived ? setChecked(true) : setChecked(false)
        }
    },[isArrived])

    function handleClicked(){
        handleUpdateReport(children.id,!checked);
        setChecked(!checked);
      }


    return(
        <AttendanceItemWrapper>
          <TrasnportNumber>תחנה מס׳ {children?.transport || 'לא קיים'}</TrasnportNumber>
          <Name>
           {`${children.childrenName} ${children.familyName}`}
         </Name>
         <span onClick={handleClicked}>
          <AttendanceIconSVG checked={checked } />
        </span>
        </AttendanceItemWrapper>
    )
}