import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSIONS } from '../../common/constants';
import { BLUE_CARD, ORANGE_CARD, PRIMARY, SECONDARY, YELLOW_CARD } from '../../common/styles/colors';
import HeaderPage from '../../components/header-page/HeaderPage';
import Task from '../../components/task/Task';
import { getDailyByDate } from '../../data/modules/schedule/schedule.action';
import { ContentStyled, HomeStyled,EmptyStyled } from './Home.styled';

export default function Home({history}){
    const { today,selectedDailyCalander } = useSelector(({schedule}) => schedule);
    const {activeUser} = useSelector(({auth}) => auth);
    const [currentDay,setCurrentDay] = useState(null); 
    const dispatch = useDispatch();
    const colors =[PRIMARY,BLUE_CARD,ORANGE_CARD,YELLOW_CARD];
    const allowedToEdit = [PERMISSIONS.ADMIN,PERMISSIONS.GENERAL_MANAGER];
    useEffect(() => {
    console.log({currentDay})
    const now = moment(+new Date()).format('YYYY-MM-DD');
    setCurrentDay(currentDay || now);
    console.log({currentDay})
    dispatch(getDailyByDate(currentDay));
    }, [currentDay])


    function currentDateChanged(date,dateString){
        setCurrentDay(dateString);
    }

    function renderDailyScheduleSelection(){
        return !!activeUser && currentDay && allowedToEdit.includes(activeUser.role) ? (
            <DatePicker defaultValue={moment(currentDay,'YYYY-MM-DD')}  style={{width:200,display:'flex',alignSelf:'center',marginTop:'2rem',marginBottom:'2rem'}} onChange={currentDateChanged}/>
        ):(
            <HeaderPage title={currentDay} size={1.2} color={PRIMARY} style={{paddingTop:'2rem',paddingBottom:'2rem'}}/>
        )
    }

    const EmptyTask = ()=>(
        <EmptyStyled>
            <HeaderPage title={'לא קיימת פעילות ביום זה'} size={1.6}/>
        </EmptyStyled>
    )

    return (
        <HomeStyled>
            <HeaderPage title={'- הלוז היומי -'} size={1.6} color={SECONDARY}/>
           {renderDailyScheduleSelection()}
            <ContentStyled>
                {selectedDailyCalander?.tasks?.length  ? selectedDailyCalander.tasks.map((task,index) => <Task background={colors[index % colors.length]} task={task}/>) : <EmptyTask/>
                }
            </ContentStyled>
        </HomeStyled>
    )
}