import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from "react-switch";
import styled from 'styled-components';
import { PRIMARY, SECONDARY, WHITE } from '../../common/styles/colors';
import HeaderPage from '../../components/header-page/HeaderPage';
import { getAllChildrens,updateChildTransportArrived,updatedChildTransportCollect} from '../../data/modules/report/report.action';
import { IconStyled, Wrapper } from '../daily-attendance/DailyAttendance.styled';
import SelfTransportItem from './SelfTrasportItem';
import { ButtonWrapper } from '../daily-attendance/Attendance.styled';
import ECButton from '../../components/button/ECButton';


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
        let updatedChildrens;
        if(isArrived){
            updatedChildrens = childrenList.map(child => child.id === id ? ({
                ...child,
                collect: checked
            }) : child)
        }else{
            updatedChildrens = childrenList.map(child => child.id === id ? ({
                ...child,
                arrived: checked
            }) : child)
        }
        console.log({updatedChildrens});
        setChildrenList(updatedChildrens);
  
   }

  function handleAllReport(){
    for(let child of childrenList){
        if(child.arrived){
            console.log({child});
             dispatch(updateChildTransportArrived(child,date));
        }
        if(child.collect){
            console.log({child});
             dispatch(updatedChildTransportCollect(child,date));
        }
    }
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
        <ButtonWrapper>
        <Wrapper>
          <ECButton  handleClicked={handleAllReport} buttonText={'עדכן דוח'} backgroundColor={WHITE} textColor={PRIMARY}/>
        </Wrapper>
    </ButtonWrapper>
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