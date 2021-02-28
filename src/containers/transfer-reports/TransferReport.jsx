import React, { useEffect,useState } from 'react';
import {TrasferReportsContainer,ReportContent} from './TransferReports.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import {useDispatch,useSelector} from 'react-redux'
import { BlockContainer } from '../../common/styles/common.styled';
import { SECONDARY } from '../../common/styles/colors';
import { getReportPoints } from '../../data/modules/report/report.action';

export default function TransferReport({}){

    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const {reportPoints} = useSelector(({report}) => report)
    const [report,setReport] = useState(null);
    useEffect(() => {
        dispatch(getReportPoints());
    },[])
    useEffect(()=>{
        if(reportPoints){
            setReport(reportPoints['2020-12-01']);
        }
    },[reportPoints])
    return(
        <TrasferReportsContainer>
        <HeaderPage  title={'- איפה אנחנו? -'} size={1.6} color={SECONDARY}/>
        <ReportContent>
            <BlockContainer height={100} style={{right:0,height:'70%'}}>

            </BlockContainer>
        </ReportContent>
        </TrasferReportsContainer>
    )
}