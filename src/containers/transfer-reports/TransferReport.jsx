import React, { useEffect } from 'react';
import {TrasferReportsContainer,ReportContent} from './TransferReports.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import {useDispatch,useSelector} from 'react-redux'
import { getAllPointReports } from '../../data/modules/report/report.service';
export default function TransferReport({}){

    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const {reportPoints} = useSelector(({report}) => report)
    const [report,setReport] = useState(null);
    useEffect(() => {
        dispatch(getAllPointReports());
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
            <BlockContainer>

            </BlockContainer>
        </ReportContent>
        </TrasferReportsContainer>
    )
}