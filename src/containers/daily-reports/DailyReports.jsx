import React,{useState,useEffect,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import { PRIMARY, SECONDARY, WHITE } from '../../common/styles/colors';
import HeaderPage from '../../components/header-page/HeaderPage';
import { DailyReportContainer, ChildrenReportWrapper } from './DailyReport.styled';
import { Select } from 'antd';
import { getGroupContacts } from '../../data/modules/contact/contact.actions';
import ReportItem from '../../components/report-item/ReportItem';
import { CounterWrapper, Wrapper } from '../daily-attendance/DailyAttendance.styled';
import { ButtonWrapper } from '../daily-attendance/Attendance.styled';
import ECButton from '../../components/button/ECButton';
import { getAllCamps, getCampById } from '../../data/modules/camp/camp.action';
import { setWaterChildReport } from '../../data/modules/report/report.action';

const { Option } = Select;

const timeToReport = ['9:00','11:00','13:00'];
export default function DailyReports({}){
    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const { contacts } = useSelector(({contact}) => contact);
    const { selectedCamp } = useSelector(({camp}) => camp );
    const [selectedTime,setSelectedTime] = useState('9:00');
    const [counter,setCounter] = useState(0)
    const [childrenList,setChildrenList] = useState([]);
    const prevTime = useRef();

    useEffect(()=> {
        dispatch(getGroupContacts(activeUser.campId,activeUser.id));
        dispatch(getCampById(activeUser?.campId));
        prevTime.current = selectedTime;
    },[])

    useEffect(()=>{
        setChildrenList(contacts.filter(child => !!child.id));
    },[contacts])

    useEffect(()=> {
        if(prevTime !== selectedTime && childrenList.length){
            let count = 0;
            const date = moment(Date.now()).format('DD-MM-YYYY');
            childrenList.forEach(child => {
                if(child?.reports[date] && child?.reports[date][selectedTime] && child?.reports[date][selectedTime].isDrinkWater){
                    count = count + 1;
                }
            })
            setCounter(count);
        }
    },[selectedTime])

    function handleCheckedClicked(checked){
        checked ? setCounter(counter + 1) : setCounter(counter - 1);
    }

    const Counter = ({count}) => (
        <CounterWrapper>{count}</CounterWrapper>
    )

    function handleReport(childId,checked){
        const mappedChildrends = childrenList.map(child => child.id == childId ? ({
            ...child,
            isDrinkedWatter:checked
        }) : child)
        setChildrenList(mappedChildrends);
    }

   
    
    
    
    
    async function handleAllReport(){
        let groupNumber;
        console.log({selectedCamp});
        if(selectedCamp && selectedCamp.groups?.length){
            selectedCamp.groups.forEach((group,index) => {
                if(group.instruction.id == activeUser?.id){
                    groupNumber = index;
                }
            })
        }
        const date = moment(Date.now()).format('DD-MM-YYYY');
        if(childrenList.length){

            childrenList.forEach(child => {
                dispatch(setWaterChildReport(activeUser?.campId, groupNumber, child.id, date, selectedTime, !!child.isDrinkedWatter));
            })
            
        }
    }

    

    return(
        <DailyReportContainer>
          <HeaderPage title={'- בקרת שתייה ומריחת קרם הגנה -'} size={1.6} color={SECONDARY}/>
          <Select
          style={{ width: '100%', marginTop: '0.7rem',marginBottom:'0.7rem'}}
          placeholder={'שעת דיווח'}
          onChange={(time) => setSelectedTime(time)}
        >
          {timeToReport.map((time) => (
            <Option value={time} key={time}>{time}</Option>
          ))}
        </Select>
        <Counter count={counter}/>
        <ChildrenReportWrapper>
        {childrenList?.filter(children => !!children.id).map(children => <ReportItem date={moment(Date.now()).format('DD-MM-YYYY')} selectedTime={selectedTime} handleChecked={handleCheckedClicked} handleReport={handleReport} children={children}/>)}
        <ButtonWrapper>
            <Wrapper>
              <ECButton handleClicked={handleAllReport} buttonText={'עדכן נוכחות'} backgroundColor={WHITE} textColor={PRIMARY}/>
            </Wrapper>
        </ButtonWrapper>
        </ChildrenReportWrapper>
        </DailyReportContainer>
    )
}