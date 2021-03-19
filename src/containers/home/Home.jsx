import React,{useEffect} from 'react';
import {HomeStyled,ContentStyled} from './Home.styled'
import HeaderPage from '../../components/header-page/HeaderPage';
import { SECONDARY, PRIMARY, BLUE_CARD, RED_CARD } from '../../common/styles/colors';
import {getDailyByDate} from '../../data/modules/schedule/schedule.action';
import { useSelector,useDispatch } from 'react-redux';
import Task from '../../components/task/Task';

export default function Home({history}){
    const { today,selectedDailyCalander } = useSelector(({schedule}) => schedule);
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getDailyByDate(today));
    }, [today])

    console.log({selectedDailyCalander})
    const colors =[PRIMARY,BLUE_CARD,RED_CARD,SECONDARY];
    return (
        <HomeStyled>
            <HeaderPage title={'- הלוז היומי -'} size={1.6} color={SECONDARY}/>
            <HeaderPage title={today} size={1.2} color={PRIMARY} style={{paddingTop:'2rem'}}/>
            <ContentStyled>
                {selectedDailyCalander?.tasks?.length  && selectedDailyCalander.tasks.map((task,index) => <Task background={colors[index % colors.length]} task={task}/>) }
            </ContentStyled>
        </HomeStyled>
    )
}