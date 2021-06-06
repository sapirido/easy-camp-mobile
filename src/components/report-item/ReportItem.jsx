import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttendanceIconSVG } from '../../common/icons/icons';
import { AttendanceItemWrapper, Name, TrasnportNumber } from '../../containers/daily-attendance/Attendance.styled';
import { checkWaterReport } from '../../data/modules/report/report.action';

export default function ReportItem({children,handleChecked,handleReport,selectedTime,date,childIndex,groupNumber,isAllowedToEdit}){


    useEffect(()=> {
        if(children?.reports && children.id &&children?.reports[date] && children?.reports[date][selectedTime]){
            setChecked(!!children?.reports[date][selectedTime].isDrinkWater);
        }else{
            setChecked(false);
        }
    },[selectedTime])
    const [checked,setChecked]  = useState(false);
    function handleClicked(){
        handleChecked(!checked);
        handleReport(children.id,!checked);
        setChecked(!checked);
    }


    

    return(
        <AttendanceItemWrapper>
        <TrasnportNumber>תחנה מס׳ {children?.transport || 'לא קיים'}</TrasnportNumber>
        <Name>
        {`${children.childrenName} ${children.familyName}`}
        </Name>
        <span onClick={() => isAllowedToEdit ?  handleClicked() : {}}>
        <AttendanceIconSVG checked={checked} />
        </span>
        </AttendanceItemWrapper>
    )
}