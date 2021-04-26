import React, { useEffect } from 'react';
import {PointWrapper,DashedRight,PointWithIcon,PointContainer} from './TransferReports.styled';
import {DonePoint,NotDonePoint} from '../../common/icons/icons' 
import { Text } from '../../common/styles/common.styled';
import { PRIMARY, WHITE } from '../../common/styles/colors';
import {HorizontalContainer} from '../../components/task/Task.styled';
import ECButton from '../../components/button/ECButton';


export default function Point({point,isLeader,isLast,onReportPoint}){

    useEffect(()=>{
        console.log({point});
    },[point.done])

    return(
    <PointContainer>
    { <ECButton handleClicked={()=>onReportPoint(point,isLast)} backgroundColor={WHITE} textColor={PRIMARY} buttonText={'דווח'} style={{width:75,visibility: point.done || !isLeader ? 'hidden':'unset'}}/>}
        <PointWrapper>
        <PointWithIcon>
            <Text>{point?.location}</Text>
        </PointWithIcon>
        <DashedRight>
        { point?.done ? <DonePoint/> : <NotDonePoint/> }
        {!isLast && <HorizontalContainer height={'6rem'} marginLeft={0.6} color={WHITE}/>}
        </DashedRight>
        </PointWrapper>
    </PointContainer>
    )
}