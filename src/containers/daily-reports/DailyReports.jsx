import React,{useState,useEffect,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import Lottie from 'react-lottie';

import { PRIMARY, SECONDARY, WHITE } from '../../common/styles/colors';
import HeaderPage from '../../components/header-page/HeaderPage';
import { DailyReportContainer, ChildrenReportWrapper } from './DailyReport.styled';
import { Select } from 'antd';
import { getCampContacts, getGroupContacts,getCampChildren } from '../../data/modules/contact/contact.actions';
import ReportItem from '../../components/report-item/ReportItem';
import { CounterWrapper, Wrapper } from '../daily-attendance/DailyAttendance.styled';
import { ButtonWrapper } from '../daily-attendance/Attendance.styled';
import ECButton from '../../components/button/ECButton';
import { getAllCamps, getCampById } from '../../data/modules/camp/camp.action';
import { setWaterChildReport } from '../../data/modules/report/report.action';
import { PERMISSIONS } from '../../common/constants';
import { ContentBox } from '../feedbacks/Feedbacks.styled';
import success from '../../assets/lottie/success_primary.json';
import { isObject } from 'lodash';

const { Option } = Select;

const timeToReport = ['9:00','11:00','13:00'];
export default function DailyReports({}){
    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const { contacts } = useSelector(({contact}) => contact);
    const { selectedCamp,camps } = useSelector(({camp}) => camp );
    const [selectedTime,setSelectedTime] = useState('9:00');
    const [counter,setCounter] = useState(0)
    const [childrenList,setChildrenList] = useState([]);
    const [isUpdated,setIsUpdated] = useState(false)
    const [groupNum,setGroupNum] = useState();
    const [campSelected,setCampSelected] = useState(null);
    const prevTime = useRef();

    useEffect(()=> {
        if(activeUser?.role === PERMISSIONS.TRANSPORT_MANAGER || activeUser?.role === PERMISSIONS.INSTRUCTION){
            dispatch(getCampById(activeUser?.campId));
            dispatch(getGroupContacts(activeUser.campId,activeUser.id));
            dispatch(getCampById(activeUser?.campId));
        } else if(activeUser?.role === PERMISSIONS.CAMP_MANAGER){
            dispatch(getCampById(activeUser?.campId));
            dispatch(getCampContacts(activeUser?.campId));
        }else{
            dispatch(getAllCamps());
        }

        prevTime.current = selectedTime;
    },[])

    useEffect(() => {
        let groupNumber;
        if(!!selectedCamp){
            const groups = isObject(selectedCamp?.groups) ? Object.values(selectedCamp?.groups || {}).filter(group => !!group?.instruction?.id) : selectedCamp?.groups;
            if(groups.length){
                groups.forEach((group,index) => {
                    if(group.instruction.id == activeUser?.id){
                        groupNumber = index;
                    }
                })
            }
            setGroupNum(groupNumber);
        }
    },[selectedCamp])

    useEffect(() => {
        if(campSelected){
            dispatch(getCampChildren(campSelected));
        }
    }
    ,[campSelected])

    useEffect(()=>{
        setChildrenList(contacts.filter(child => !!child.id));
    },[contacts])

    useEffect(() => {
    setCountByDbData();
    },[childrenList.length])

    useEffect(()=> {
        if(prevTime !== selectedTime && childrenList.length){
            dispatch(getGroupContacts(activeUser.campId,activeUser.id));
            setCountByDbData();
        }
    },[selectedTime])

    function setCountByDbData(){
            let count = 0;
            const date = moment(Date.now()).format('DD-MM-YYYY');
            childrenList.forEach(child => {
                if(child?.reports &&child?.reports[date] && child?.reports[date][selectedTime] && child?.reports[date][selectedTime].isDrinkWater){
                    count = count + 1;
                }
            })
            setCounter(count);
    }

    function handleCheckedClicked(checked){
        checked ? setCounter(counter + 1) : counter ? setCounter(counter - 1) : setCounter(0);
    }

    const Counter = ({count}) => (
        <CounterWrapper>{count}</CounterWrapper>
    )

    function handleReport(childId,checked){
        const mappedChildrends = childrenList.map(child => child.id == childId ? {
            ...child,
            isDrinkWater:checked
        } : child)
        setChildrenList(mappedChildrends);
    }

   
    
    async function handleAllReport(){
        const date = moment(Date.now()).format('DD-MM-YYYY');
        if(childrenList.length){
            setIsUpdated(true);
            childrenList.forEach((child,index) => {
                let isDrink;
                if(child?.reports && child.reports[date] && child.reports[date][selectedTime]){
                    isDrink = child.reports[date][selectedTime].isDrinkWater;
                }
                isDrink = !!isDrink || !!child.isDrinkWater;
                
                dispatch(setWaterChildReport(activeUser?.campId, groupNum, index, date, selectedTime, isDrink));
            })
            setTimeout(() => {
                setIsUpdated(false)
            },2000)
        }
    }

    const defaultOptions = {
        loop:true,
        autoplay:true,
        animationData: success,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }
    
       if(isUpdated) { 
           return (
            <ContentBox> <Lottie options={defaultOptions} height={250} width={250}/> </ContentBox>
           )
       }

    const isAllowedToEdit = activeUser?.role === PERMISSIONS.INSTRUCTION || activeUser?.role === PERMISSIONS.TRANSPORT_MANAGER;
    return(
        <DailyReportContainer>
          <HeaderPage title={'- בקרת שתייה ומריחת קרם הגנה -'} size={1.6} color={SECONDARY}/>
          {activeUser?.role === PERMISSIONS.GENERAL_MANAGER || activeUser?.role === PERMISSIONS.ADMIN && (
            <Select
            style={{ width: '60%',margin:'auto', marginTop: '0.7rem',marginBottom:'0.7rem'}}
            placeholder={'בחר מחנה'}
            onChange={(campId) => setCampSelected(campId)}
            value={campSelected}
          >
            {camps.map((camp) => (
              <Option value={camp.camp_id} key={camp.camp_id}>{camp.camp_name}</Option>
            ))}
            </Select>
          )}
          <Select
          style={{ width: '60%',margin:'auto', marginTop: '0.7rem',marginBottom:'0.7rem'}}
          placeholder={'שעת דיווח'}
          onChange={(time) => setSelectedTime(time)}
          value={selectedTime}
        >
          {timeToReport.map((time) => (
            <Option value={time} key={time}>{time}</Option>
          ))}
        </Select>
        <Counter count={counter}/>
        <ButtonWrapper>
            <Wrapper>
              <ECButton  handleClicked={handleAllReport} buttonText={'עדכן דוח'} backgroundColor={WHITE} textColor={PRIMARY}/>
            </Wrapper>
        </ButtonWrapper>
        <ChildrenReportWrapper>
        {childrenList?.filter(children => !!children.id).map((children,index) => <ReportItem isAllowedToEdit={isAllowedToEdit} groupNumber={groupNum} childIndex={index} key={children.id} date={moment(Date.now()).format('DD-MM-YYYY')} selectedTime={selectedTime} handleChecked={handleCheckedClicked} handleReport={handleReport} children={children}/>)}

        </ChildrenReportWrapper>
        </DailyReportContainer>
    )
}