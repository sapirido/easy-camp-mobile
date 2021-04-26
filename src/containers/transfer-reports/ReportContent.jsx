import React, { useEffect,useState } from 'react';
import Point from './Point';
import {ReportContentContainer} from './TransferReports.styled';

export default function ReportContent({report,isLeader = false,onReportPoint}){

const [relevantPoints,setRelevantPoints] = useState([]);

useEffect(() => {
    console.log({rep:report})
},[])

useEffect(() => {
    console.log({reportInContent:report});
if(!!report && !report?.src_done){
    const currPoints = Object.values(report.points).filter(({type}) => type === 'to_dest');
    setRelevantPoints(currPoints);
    console.log({relevantPoints});
}
},[report])



return (
<ReportContentContainer>
    {relevantPoints.map((point,index) => (
        <Point point={point} key={index} onReportPoint={onReportPoint} isLeader={isLeader} isLast={index === relevantPoints.length - 1}/>
    ))}
</ReportContentContainer>    
)
}