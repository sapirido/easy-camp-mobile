import React, { useEffect,useState } from 'react';
import { AttendanceIconSVG } from '../../common/icons/icons';
import { AttendanceItemWrapper,Name,TrasnportNumber } from '../daily-attendance/Attendance.styled';

export default function({children,date,handleUpdateReport,isArrived}){
    const [checked,setChecked]  = useState(false);

    useEffect(() => {
        if(isArrived){
            children?.selfTransports && children?.selfTransports?.[date]?.noon ? setChecked(true) : setChecked(false)
        }else{
            children?.selfTransports && children?.selfTransports?.[date]?.morning ? setChecked(true) : setChecked(false)
        }
    },[])

    function handleClicked(){
        handleUpdateReport(children.id,!checked);
        setChecked(!checked);
      }

      console.log({children})

    return(
        <AttendanceItemWrapper>
          <TrasnportNumber>תחנה מס׳ {children?.transport || 'לא קיים'}</TrasnportNumber>
          <Name>
           {`${children.childrenName} ${children.familyName}`}
         </Name>
         <span onClick={handleClicked}>
          <AttendanceIconSVG checked={checked} />
        </span>
        </AttendanceItemWrapper>
    )
}