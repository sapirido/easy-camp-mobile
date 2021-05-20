import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {DailyAttendanceWrapper} from './DailyAttendance.styled'
import { PRIMARY, SECONDARY,WHITE } from '../../common/styles/colors';
import HeaderPage from '../../components/header-page/HeaderPage';
import Switch from "react-switch";
import moment from 'moment';
import { SearchContainer } from '../../common/styles/common.styled';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSIONS } from '../../common/constants';
import {Input} from 'antd';
import { getCampContacts, getGroupContacts, getTransportContacts } from '../../data/modules/contact/contact.actions';
import { getAllCamps, getInstructionCamp } from '../../data/modules/camp/camp.action';
import { AttendancesWrapper,ButtonWrapper } from './Attendance.styled';
import AttendanceItem from './AttendanceItem';
import ECButton from '../../components/button/ECButton';
import {updateChildrensAttendance} from '../../data/modules/attandance/attendance.action'


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

    useEffect(() => {
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
        getContactsByRole();
    },[isGroup,selectedInstruction,selectedCamp])

    useEffect(() => {
        if(contacts.length){
            setRootContacts(contacts);
            setContact(contacts)
        }
    },[contacts])

    function getContactsByRole(){
        console.log({activeUser,isGroup});
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
        console.log({value});
        if(value === ''){
            setContact(rootContacts);
            return;
        }

        const filteredContacts = rootContacts.filter(contact => contact.childrenName?.startsWith(value))
        setContact(filteredContacts);
    }

    console.log({instructions,camps,contacts,activeUser})
    console.log({rootContacts,contactList});

    function renderContentByRole(){
        switch(activeUser?.role){
            case PERMISSIONS.INSTRUCTION:
                return(
                    <HeaderPage
                    title={moment(Date.now()).format('DD.MM.YYYY')}
                    size={1.2}
                    color={PRIMARY}
                    style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
                  />
                )
            
        }
    }

   function handleChecked(){
       setIsGroup(!isGroup);
   }

   async function updateAttendance(){
       console.log('updates');
       dispatch(updateChildrensAttendance(date,rootContacts,isGroup))
       

   }

   function handleUpdateAttendance(id,checked){
        const updatedChildrenList = rootContacts.map(children => children.id === id ? ({
            ...children,
            attended: checked
        }) : children)

        setRootContacts(updatedChildrenList);
   }

   

    return (
     <DailyAttendanceWrapper>
     <HeaderPage  title={'- נוכחות יומית -'} size={1.6} color={SECONDARY}/>
     { activeUser?.leader && <Switch 
        width={167}
        height={32}
        onChange={handleChecked}
        checked={isGroup} 
        offColor={PRIMARY} 
        onColor={PRIMARY} 
        borderRadius={16} 
        uncheckedIcon={<Icon justifyContent={'left'} width={'3rem'} label={'הסעה'}/>} 
        checkedIcon={<Icon label={'קבוצה'}/>}
        />}
     {renderContentByRole()}
     <SearchContainer>
     <SearchWrapper onChange={e => searchHandler(e.target.value)} placeholder={'חיפוש'} onSearch={searchHandler}/>
     </SearchContainer>
     <AttendancesWrapper>
     {contactList?.map(children => <AttendanceItem handleUpdateAttendance={handleUpdateAttendance} children={children} key={children.id}/>)}
     </AttendancesWrapper>
     <ButtonWrapper>
     <ECButton handleClicked={updateAttendance} buttonText={'עדכן נוכחות'} backgroundColor={WHITE} textColor={PRIMARY}/>
     </ButtonWrapper>
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