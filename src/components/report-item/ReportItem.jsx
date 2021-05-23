import moment from 'moment';
import React,{useEffect, useState} from 'react';
import { AttendanceIconSVG } from '../../common/icons/icons';
import { AttendanceItemWrapper, TrasnportNumber,Name } from '../../containers/daily-attendance/Attendance.styled';

export default function ReportItem({children,handleChecked,handleReport,selectedTime,date}){

    const [checked,setChecked]  = useState(false);
    function handleClicked(){
        handleChecked(!checked);
        handleReport(children.id,!checked);
        setChecked(!checked);
    }

    useEffect(()=> {
        if(children?.reports && children.id &&children?.reports[date] && children?.reports[date][selectedTime]){
            setChecked(!!children?.reports[date][selectedTime].isDrinkWater);
        }
    },[])

    

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