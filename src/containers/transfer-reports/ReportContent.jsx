import React, { useEffect,useState } from 'react';
import Point from './Point';
import {ReportContentContainer} from './TransferReports.styled';

export default function ReportContent({report,isLeader = false,onReportPoint}){

const [relevantPoints,setRelevantPoints] = useState([]);

useEffect(() => {
    console.log({rep:report})
},[])

useEffect(() => {
if(!!report){
    const currPoints = Object.values(report.points).filter(({type}) => report.to_dest ? type ===  'to_src' : type ===  'to_dest');
    setRelevantPoints(currPoints);
}
},[report])


return (
<ReportContentContainer>
    {relevantPoints.map((point,index) => (
        <Point point={point} key={index} onReportPoint={(point,isLast) => onReportPoint(point,report,isLast)} isLeader={isLeader} isLast={index === relevantPoints.length - 1}/>
    ))}
</ReportContentContainer>    
)
}