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
    const [loading,setLoading] = useState(false);
    const [groupNum,setGroupNum] = useState();
    const prevTime = useRef();

    useEffect(()=> {
        dispatch(getGroupContacts(activeUser.campId,activeUser.id));
        dispatch(getCampById(activeUser?.campId));

        prevTime.current = selectedTime;
    },[])

    useEffect(() => {
        let groupNumber;
        if(selectedCamp && selectedCamp.groups?.length){
            selectedCamp.groups.forEach((group,index) => {
                if(group.instruction.id == activeUser?.id){
                    groupNumber = index;
                }
            })
            setGroupNum(groupNumber);
        }
    },[selectedCamp])

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
                if(child?.reports[date] && child?.reports[date][selectedTime] && child?.reports[date][selectedTime].isDrinkWater){
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
        const mappedChildrends = childrenList.map(child => child.id == childId ? ({
            ...child,
            isDrinkWater:checked
        }) : child)
        setChildrenList(mappedChildrends);
    }

   
    
    
    
    
    async function handleAllReport(){
        const date = moment(Date.now()).format('DD-MM-YYYY');
        if(childrenList.length){
            childrenList.forEach((child,index) => {
                let isDrink;
                if(child?.reports && child.reports[date] && child.reports[date][selectedTime]){
                    isDrink = child.reports[date][selectedTime].isDrinkWater;
                }
                isDrink = !!isDrink || !!child.isDrinkWater;
                
                dispatch(setWaterChildReport(activeUser?.campId, groupNum, index, date, selectedTime, isDrink));
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
          value={selectedTime}
        >
          {timeToReport.map((time) => (
            <Option value={time} key={time}>{time}</Option>
          ))}
        </Select>
        <Counter count={counter}/>
        <ChildrenReportWrapper>
        {childrenList?.filter(children => !!children.id).map((children,index) => <ReportItem groupNumber={groupNum} childIndex={index} key={children.id} date={moment(Date.now()).format('DD-MM-YYYY')} selectedTime={selectedTime} handleChecked={handleCheckedClicked} handleReport={handleReport} children={children}/>)}
        <ButtonWrapper>
            <Wrapper>
              <ECButton  handleClicked={handleAllReport} buttonText={'עדכן דוח'} backgroundColor={WHITE} textColor={PRIMARY}/>
            </Wrapper>
        </ButtonWrapper>
        </ChildrenReportWrapper>
        </DailyReportContainer>
    )
}