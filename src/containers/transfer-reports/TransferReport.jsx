import { Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRIMARY, SECONDARY } from '../../common/styles/colors';
import { BlockContainer } from '../../common/styles/common.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import { getTransportNumbers } from '../../data/modules/master.camp/masterCamps.action';
import { getReportPoints, setSelectedReport, updatePointAsDone } from '../../data/modules/report/report.action';
import { SelectionContainer } from '../home/Home.styled';
import ReportContent from './ReportContent';
import { ReportContainer, TextWrapper, TrasferReportsContainer } from './TransferReports.styled';

const {Option} = Select;

export default function TransferReport({}){

    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const {reportPoints,selectedReport = null} = useSelector(({report}) => report)
    const campId = useSelector(({camp}) => camp?.selectedChild?.campId)
    const { transportList = [] } = useSelector(({masterCamp}) => masterCamp);
    const [selectedTransport,setSelectedTransport] = useState('');
    useEffect(() => {
            if( activeUser?.role === 1 ) {
                dispatch(getReportPoints(activeUser.transport))
            }
            if(activeUser?.role > 4){
                dispatch(getTransportNumbers());
            }
            if(activeUser?.role === 3){
                dispatch(getReportPoints(activeUser.transportNumber));
             }
    },[activeUser])


    useEffect(() => {
        if(!!reportPoints){
            const now = Date.now();
            const formattedDate = moment(now).format('YYYY-MM-DD');
            dispatch(setSelectedReport(reportPoints[formattedDate]));
        }
    },[reportPoints])

    useEffect(() => {
        if(!!selectedTransport){
            dispatch(getReportPoints(selectedTransport))
        }
    },[selectedTransport])

    function reportPointHandler(point,report,isLast){
        dispatch(updatePointAsDone(activeUser?.transportNumber,point,selectedReport,isLast));
    }

    function renderTitleByDirection(){
        if(!selectedReport?.source || !selectedReport?.dest) return null;
        return  selectedReport?.dest_done ? `${selectedReport?.dest} -> ${selectedReport?.source}` :`${selectedReport?.dest} <- ${selectedReport?.source}`;
    }
    return(
        <TrasferReportsContainer>
        <TextWrapper>
        <HeaderPage  title={'- איפה אנחנו? -'} size={1.6} color={SECONDARY}/>
        <HeaderPage
        title={renderTitleByDirection()}
        size={1.2}
        color={PRIMARY}
      />
     {
         activeUser?.role > 4 && (
            <SelectionContainer style={{padding:'1.5rem 0px'}}>
            <Select
            allowClear
            style={{ width: '100%', marginBottom: '1.5rem' }}
            placeholder={'בחר מחנה'}
            onChange={(transport) => setSelectedTransport(transport)}
          >
          {transportList.map(transportNumber => (
              <Option value={transportNumber} key={transportNumber}>הסעה {transportNumber}</Option>
          ))}
          </Select>
        </SelectionContainer>
         )
     } 
     
      </TextWrapper>
        <ReportContainer>
            <BlockContainer height={100} style={{right:0,height:'65%'}}>
                <ReportContent isLeader={activeUser?.leader} onReportPoint={reportPointHandler} report={selectedReport}/>
            </BlockContainer>
        </ReportContainer>
        </TrasferReportsContainer>
    )
}