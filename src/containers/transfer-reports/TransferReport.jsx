import React, { useEffect,useState } from 'react';
import {TrasferReportsContainer,ReportContainer} from './TransferReports.styled';
import ReportContent from './ReportContent';
import HeaderPage from '../../components/header-page/HeaderPage';
import {useDispatch,useSelector} from 'react-redux'
import { BlockContainer } from '../../common/styles/common.styled';
import { SECONDARY } from '../../common/styles/colors';
import { getReportPoints } from '../../data/modules/report/report.action';
import { getChildById } from '../../data/modules/camp/camp.action';
import moment from 'moment';

export default function TransferReport({}){

    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const {reportPoints} = useSelector(({report}) => report)
    const {selectedChild} = useSelector(({camp}) => camp);
    const [report,setReport] = useState(null);
    useEffect(() => {
        if( activeUser?.role === 1 ) {//parent
            dispatch(getChildById(activeUser.childId))
        }
    },[])
    useEffect(() => {
        if(!!selectedChild){
        const {campId} = selectedChild;
        dispatch(getReportPoints(campId));
        }
    },[selectedChild])

    useEffect(() => {
        if(!!reportPoints){
            const now = Date.now();
            const formattedDate = moment(now).format('YYYY-MM-DD');
            console.log({formattedDate});
            setReport(reportPoints['2021-04-24']);
        }
    },[reportPoints])

    useEffect(() => {
        console.log({report});
    },[report])


    console.log({selectedChild,reportPoints});
    console.log({report});
    return(
        <TrasferReportsContainer>
        <HeaderPage  title={'- איפה אנחנו? -'} size={1.6} color={SECONDARY}/>
        <ReportContainer>
            <BlockContainer height={100} style={{right:0,height:'70%'}}>
                <ReportContent report={report}/>
            </BlockContainer>
        </ReportContainer>
        </TrasferReportsContainer>
    )
}