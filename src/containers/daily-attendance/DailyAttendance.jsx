import React, { useEffect, useState,useRef } from 'react';
import styled from 'styled-components';
import {DailyAttendanceWrapper,Wrapper,CounterWrapper} from './DailyAttendance.styled'
import { PRIMARY, SECONDARY,WHITE } from '../../common/styles/colors';
import HeaderPage from '../../components/header-page/HeaderPage';
import Switch from "react-switch";
import moment from 'moment';
import { SearchContainer } from '../../common/styles/common.styled';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSIONS } from '../../common/constants';
import { Input,DatePicker } from 'antd';
import { getCampContacts, getGroupContacts, getTransportContacts } from '../../data/modules/contact/contact.actions';
import { getAllCamps, getInstructionCamp } from '../../data/modules/camp/camp.action';
import { AttendancesWrapper,ButtonWrapper } from './Attendance.styled';
import AttendanceItem from './AttendanceItem';
import ECButton from '../../components/button/ECButton';
import {updateChildrensAttendance} from '../../data/modules/attandance/attendance.action'
import {Select} from 'antd';

const  { Option } = Select; 


const {Search} = Input;

export default function DailyAttendance({}){
    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const { contacts } = useSelector(({contact}) => contact);
    const { camps,instructions } = useSelector(({camp}) => camp);
    const [contactList,setContact] = useState([]);
    const [rootContacts,setRootContacts] = useState([]);
    const [date,setDate] = useState(moment(Date.now()).format('DD-MM-YYYY'))
    const [isGroup,setIsGroup] = useState(true);
    const [selectedInstruction,setSelectedInstruction] = useState(null);
    const [selectedCamp,setSelectedCamp] = useState(null);
    const [selectedStation,setSelectedStation] = useState('ALL');
    const [isMorning,setIsMorning] = useState(true);

    const prevDate = useRef();

    useEffect(() => {
        prevDate.current = date;
        if(activeUser?.role === PERMISSIONS.ADMIN || activeUser.role === PERMISSIONS.GENERAL_MANAGER){
            dispatch(getAllCamps());
        }
        if(activeUser?.role === PERMISSIONS.CAMP_MANAGER){
            dispatch(getInstructionCamp(activeUser.campId));
        }
        if(activeUser?.role === PERMISSIONS.INSTRUCTION || activeUser?.role === PERMISSIONS.TRANSPORT_MANAGER){
            getContactsByRole();
        }
    },[isGroup])

    useEffect(() => {
     if(selectedStation === 'ALL'){
         setContact(contacts);
     }else{
         const filteredChildren = rootContacts?.filter(child => child.transport == selectedStation);
         setContact(filteredChildren);
     }

    },[selectedStation])

    useEffect(() => {
        if(selectedCamp){
            setSelectedInstruction(null);
            dispatch(getInstructionCamp(selectedCamp));
        }
    },[selectedCamp])

    useEffect(() => {   
        console.log('here!!!',contacts);
        if(contacts.length){
            console.log({contacts})
            setRootContacts(contacts);
            setContact(contacts)
        }
    },[contacts])

    useEffect(()=>{
        console.log({date,prevDate:prevDate.current})
        if(date !== prevDate.current){
            if(selectedInstruction){
                const instruction = instructions.find(ins => ins.id === selectedInstruction);
                dispatch(getGroupContacts(instruction.campId,selectedInstruction))
            }
        }
    },[date])

    useEffect(() => {
        if(selectedInstruction){
            const instruction = instructions.find(ins => ins.id === selectedInstruction);
            dispatch(getGroupContacts(instruction.campId,selectedInstruction))
        }
    },[selectedInstruction])

    function getContactsByRole(){
        switch(activeUser.role){
            case PERMISSIONS.INSTRUCTION:
                dispatch(getGroupContacts(activeUser.campId,activeUser.id));
                break;
            case PERMISSIONS.TRANSPORT_MANAGER:
                isGroup ?  dispatch(getGroupContacts(activeUser.campId,activeUser.id)) : dispatch(getTransportContacts(activeUser.transports));
                break;
            case PERMISSIONS.CAMP_MANAGER:
                dispatch(getGroupContacts(activeUser.campId,selectedInstruction));
                break;
            case PERMISSIONS.GENERAL_MANAGER:
            case PERMISSIONS.ADMIN:
                dispatch(getCampContacts(selectedCamp));
                break;
        }
        
    }

    function Icon({label}){
        return (<IconStyled>{label}</IconStyled>)
    } 

    function searchHandler(value){
        if(value === ''){
            setContact(rootContacts);
            return;
        }

        const filteredContacts = rootContacts.filter(contact => contact.childrenName?.startsWith(value))
        setContact(filteredContacts);
    }


    const Counter = () => (
        <CounterWrapper>{isGroup ? contactList.filter(child => !!child.id && (child?.attended || child.attendance[date]?.group)).length : contactList.filter(child => child.attendance[date]?.transport?.morning).length }</CounterWrapper>
    )
    


    function renderContentByRole(){
        switch(activeUser?.role){
            case PERMISSIONS.INSTRUCTION:
                return(
                    <>
                    <HeaderPage
                    title={moment(Date.now()).format('DD.MM.YYYY')}
                    size={1.2}
                    color={PRIMARY}
                    style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
                  />
                  <Counter/>
                  </>

                )

            case PERMISSIONS.TRANSPORT_MANAGER:
                return (
                    
                    <React.Fragment>
                    <HeaderPage
                    title={moment(Date.now()).format('DD.MM.YYYY')}
                    size={1.2}
                    color={PRIMARY}
                    style={{ paddingTop: '1rem', paddingBottom: '0.7rem' }}
                  />
                    <Switch 
                    width={167}
                    height={32}
                    onChange={handleChecked}
                    checked={isGroup} 
                    offColor={PRIMARY} 
                    onColor={PRIMARY} 
                    borderRadius={16} 
                    uncheckedIcon={<Icon justifyContent={'left'} width={'3rem'} label={'הסעה'}/>} 
                    checkedIcon={<Icon label={'קבוצה'}/>}
                    />
                
                  {!isGroup && 
                    <>
                    <Select
                  style={{ width: '100%', marginTop: '0.7rem',marginBottom:'0.7rem'}}
                  placeholder={'בחר תחנה'}
                  onChange={(stationId) => setSelectedStation(stationId)}
                >
                 <Option value={'ALL'}>כל התחנות</Option>
                  {activeUser?.transports?.map((station) => (
                    <Option value={station} key={station}>תחנה מס׳ {station}</Option>
                  ))}
                </Select>
                <Switch 
                width={167}
                height={32}
                onChange={() => setIsMorning(!isMorning)}
                checked={isMorning} 
                offColor={PRIMARY} 
                onColor={PRIMARY}
                borderRadius={16} 
                uncheckedIcon={<Icon justifyContent={'left'} width={'3rem'} label={'צהריים'}/>} 
                checkedIcon={<Icon label={'בוקר'}/>}
                />
                </>
            }
                 
                <Counter/>
              </React.Fragment>
                )

                case PERMISSIONS.CAMP_MANAGER:
                    return (
                        <>
                            <DatePicker
                            defaultValue={moment(date, 'YYYY-MM-DD')}
                            style={{
                              display: 'flex',
                              alignSelf: 'center',
                              marginTop: '2rem',
                              marginBottom: '1rem',
                            }}
                            onChange={currentDateChanged}
                          />
                          <Select
                          style={{ width: '100%', marginTop: '0.7rem',marginBottom:'0.7rem'}}
                          placeholder={'בחר מדריך'}
                          onChange={(instruction) => setSelectedInstruction(instruction)}
                        >
                          {instructions?.map((instruction) => (
                            <Option value={instruction.id} key={instruction.id}>{instruction.name}</Option>
                          ))}
                        </Select> 
                        <Counter/>
                        </>
                    )
                case PERMISSIONS.ADMIN:
                case PERMISSIONS.GENERAL_MANAGER:
                    return(
                        <>
                        <DatePicker
                        defaultValue={moment(date, 'YYYY-MM-DD')}
                        style={{
                          display: 'flex',
                          alignSelf: 'center',
                          marginTop: '2rem',
                          marginBottom: '1rem',
                        }}
                        onChange={currentDateChanged}
                      />
                      <Select
                      style={{ width: '100%', marginTop: '0.7rem',marginBottom:'0.7rem'}}
                      placeholder={'בחר מחנה'}
                      onChange={(campId) => setSelectedCamp(campId)}
                    >
                      {camps?.map((camp) => (
                        <Option value={camp.camp_id} key={camp.camp_id}>{camp.camp_name}</Option>
                      ))}
                    </Select>
                    {selectedCamp &&
                        <>
                        <Select
                        style={{ width: '100%', marginTop: '0.7rem',marginBottom:'0.7rem'}}
                        placeholder={'בחר מדריך'}
                        value={selectedInstruction}
                        onChange={(instruction) => setSelectedInstruction(instruction)}
                      >
                        {instructions?.map((instruction) => (
                          <Option value={instruction.id} key={instruction.id}>{instruction.name}</Option>
                        ))}
                      </Select> 
                      <Counter/>
                      </>
                     }

                        </>
                    )
            
        }
    }

    function currentDateChanged(date, dateString) {
        setDate(moment(date).format('DD-MM-YYYY'));
    }
  
   function handleChecked(){
       setIsGroup(!isGroup);
   }

   function updateAttendance(){
    switch(activeUser.role){
      
        case PERMISSIONS.TRANSPORT_MANAGER:
        case PERMISSIONS.INSTRUCTION:
        dispatch(updateChildrensAttendance(activeUser.campId,activeUser.id,date,rootContacts,isGroup,isMorning))
            break;
        case PERMISSIONS.CAMP_MANAGER:
            dispatch(getGroupContacts(activeUser.campId,selectedInstruction));
            break;
        case PERMISSIONS.GENERAL_MANAGER:
        case PERMISSIONS.ADMIN:
            dispatch(updateChildrensAttendance(selectedCamp,selectedInstruction,date,rootContacts,isGroup,isMorning))
            break;
    }
   }

   function isAllowedToChange(role){
    return role === PERMISSIONS.INSTRUCTION || role === PERMISSIONS.TRANSPORT_MANAGER || role === PERMISSIONS.GENERAL_MANAGER || role === PERMISSIONS.ADMIN 
   }

   function handleUpdateAttendance(id,checked){
        const updatedChildrenList = rootContacts.map(children => children.id === id ? ({
            ...children,
            attended: checked
        }) : children)

        setRootContacts(updatedChildrenList);
   }

   console.log({contactList});

   
    return (
     <DailyAttendanceWrapper>
     <HeaderPage  title={'- נוכחות יומית -'} size={1.6} color={SECONDARY}/>

     {renderContentByRole()}
   
     <AttendancesWrapper>
     {contactList?.filter(children => !!children?.id)?.map(children => <AttendanceItem isGroup={isGroup} isEnabledChange={isAllowedToChange(activeUser?.role)} date={date} handleUpdateAttendance={handleUpdateAttendance} isMorning={isMorning} children={children} key={children.id}/>)}
     {isAllowedToChange(activeUser?.role) && contactList.length > 0 && <ButtonWrapper>
     <Wrapper>
    <ECButton handleClicked={updateAttendance} buttonText={'עדכן נוכחות'} backgroundColor={WHITE} textColor={PRIMARY}/>
    </Wrapper>
    </ButtonWrapper>}
     </AttendancesWrapper>
     </DailyAttendanceWrapper>
    )
}

const SearchWrapper = styled(Search)`
width: 100%;
min-width: 100%;
`

const IconStyled = styled.div`
color:${WHITE};
display:flex;
text-align:center;
align-items:center;
justify-content:${({justifyContent}) => justifyContent ? justifyContent : 'center'};
padding-top:0.4rem;
font-size:1rem;
font-weight:600;
width:${({width}) => width ? width : '3rem'};
`

// <SearchContainer>
// <SearchWrapper onChange={e => searchHandler(e.target.value)} placeholder={'חיפוש'} onSearch={searchHandler}/>
// </SearchContainer>