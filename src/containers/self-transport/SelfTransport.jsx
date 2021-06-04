import React, { useEffect, useState } from 'react';
import {DatePicker,Select} from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import HeaderPage from '../../components/header-page/HeaderPage';
import { PRIMARY, SECONDARY } from '../../common/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContacts } from '../../data/modules/contact/contact.actions';
import Switch from "react-switch";
import {IconStyled } from '../daily-attendance/DailyAttendance.styled'
import SelfTransportItem from './SelfTrasportItem';
import { getAllChildrens } from '../../data/modules/report/report.action';

export default function SelfTransport({}){

    const [date,setDate] = useState(moment(Date.now()).format('DD-MM-YYYY'));
    const [isArrived,setIsArrived] = useState(true);
    const [childrenList,setChildrenList] = useState([]);
    const dispatch = useDispatch();
    const { childrens } = useSelector(({report}) => report);


    function currentDateChanged(date, dateString) {
        setDate(moment(date).format('DD-MM-YYYY'));
    }

    useEffect(() => {
        dispatch(getAllChildrens());
    },[])

    useEffect(() => {
        if(!!childrens){
            setChildrenList(childrens);
        }
    },[childrens])

    function Icon({label}){
        return (<IconStyled>{label}</IconStyled>)
    } 

    function handleReport(id,checked){

        const updatedChildrenList = childrenList.map(children => children.id === id ? ({
            ...children,
            attended: checked
        }) : children)
  
   }


console.log({childrenList})
    return(
        <SelfTransportWrapper>
          <HeaderPage  title={'- איסוף והגעה עצמית -'} size={1.6} color={SECONDARY}/>
         <SwitcherWrapper>
             <Switch 
             width={167}
             height={32}
             onChange={() => setIsArrived(!isArrived)}
             checked={isArrived} 
             offColor={PRIMARY} 
             onColor={PRIMARY} 
             borderRadius={16} 
             uncheckedIcon={<Icon justifyContent={'left'} width={'3rem'} label={'הגעה עצמית'}/>} 
             checkedIcon={<Icon label={'איסוף עצמי'}/>}
             /> 
        </SwitcherWrapper>
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
      <ListWrapper>
        {childrenList?.filter(child => !!child.id).map(children => <SelfTransportItem key={children.id} children={children} date={date} handleUpdateReport={handleReport} isArrived={isArrived}/>) }
      </ListWrapper>
    </SelfTransportWrapper>
    )
}

const SelfTransportWrapper = styled.div`
flex-direction:column;
align-items:center;
height:fit-content;
overflow:scroll;
width: 100%;
text-align:center;
`

const SwitcherWrapper = styled.div`
padding:12px 0;
`

export const ListWrapper = styled.div`
width:100%;
display: grid;
grid-gap: 15px;
grid-template-columns: 1fr;
padding:25px 0;
overflow:scroll;
height:fit-content;
max-height:33rem;
`