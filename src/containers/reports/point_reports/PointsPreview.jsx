import React from 'react';
import {PointPrivewStyled,PointsStyled,TextStyled} from './PointReport.styled'
import {Steps} from 'antd';
const {Step} = Steps;
export default function PointPreview({report}){
    const srcToDest = report.points.filter(point => point.type === 'to_dest').sort((a,b) => a.order - b.order);
    const destToSrc = report.points.filter(point => point.type === 'to_src').sort((a,b) => a.order - b.order);
    return(
        <PointPrivewStyled>
            <PointsStyled>
            <TextStyled>{report.source} {'->'} {report.dest}</TextStyled>
        <Steps direction="vertical" size="small">
        {/* {report.points.map((point,index) =>())} */}
        {srcToDest.map((point,index)=><Step status={'wait'} title={point.location} key={index}/>)}
      </Steps>
      </PointsStyled>
      <PointsStyled>
      <TextStyled>{report.source} {'<-'} {report.dest}</TextStyled>
        <Steps direction="vertical" size="small"  current={destToSrc.length - 1}>
        {destToSrc.map((point,index)=><Step status={'wait'} title={point.location} key={index}/>)}
      </Steps>
      </PointsStyled>
      </PointPrivewStyled>
    )
}