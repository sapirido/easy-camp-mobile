import React, { useEffect,useState } from 'react';
import {TrasferReportsContainer,ReportContainer,TextWrapper} from './TransferReports.styled';
import ReportContent from './ReportContent';
import HeaderPage from '../../components/header-page/HeaderPage';
import {useDispatch,useSelector} from 'react-redux'
import { BlockContainer } from '../../common/styles/common.styled';
import { PRIMARY, SECONDARY } from '../../common/styles/colors';
import { getReportPoints,updatePointAsDone } from '../../data/modules/report/report.action';
import { getChildById } from '../../data/modules/camp/camp.action';
import { SelectionContainer } from '../home/Home.styled';
import {Select} from 'antd';
import moment from 'moment';

const {Option} = Select;

export default function TransferReport({}){

    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const {reportPoints} = useSelector(({report}) => report)
    const {selectedChild} = useSelector(({camp}) => camp);
    const campId = useSelector(({camp}) => camp?.selectedChild?.campId)
    const [report,setReport] = useState(null);
    const [selectedTransport,setSelectedTransport] = useState('');
    useEffect(() => {
        if( activeUser?.role === 1 ) {
            dispatch(getReportPoints(activeUser.transport))
        }
    },[activeUser])

    useEffect(() => {
        if(!!reportPoints){
            const now = Date.now();
            const formattedDate = moment(now).format('YYYY-MM-DD');
            console.log({formattedDate});
            setReport(reportPoints['2021-04-24']);
        }
    },[reportPoints])

    function reportPointHandler(point,report,isLast){
        dispatch(updatePointAsDone(activeUser?.transport,point,report,isLast));
    }

    function renderTitleByDirection(){
        return report?.to_dest ? `${report?.dest} -> ${report?.source}` :`${report?.dest} <- ${report?.source}`;
    }
    return(
        <TrasferReportsContainer>
        <TextWrapper>
        <HeaderPage  title={'- איפה אנחנו? -'} size={1.6} color={SECONDARY}/>
        <HeaderPage
        title={renderTitleByDirection()}
        size={1.2}
        color={PRIMARY}
        style={{ paddingTop: '0.4rem' }}
      />
      <SelectionContainer>
      <Select
      allowClear
      style={{ width: '100%', marginBottom: '1.5rem' }}
      placeholder={'בחר מחנה'}
      onChange={(transport) => setSelectedTransport(transport)}
    >
   <Option value="1">הסעה 1</Option>
    </Select>
  </SelectionContainer>
      </TextWrapper>
        <ReportContainer>
            <BlockContainer height={100} style={{right:0,height:'70%'}}>
                <ReportContent isLeader={activeUser?.leader} onReportPoint={reportPointHandler} report={report}/>
            </BlockContainer>
        </ReportContainer>
        </TrasferReportsContainer>
    )
}