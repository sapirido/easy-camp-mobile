import React from 'react';
import {TaskStyled,HorizontalContainer,TaskContentStyled,TimeContiner,TitleStyled,DescriptionStyled,SideStyled,BallStyled} from './Task.styled';
export default function Task({background,task}){

    return(
        <TaskStyled>
            <TaskContentStyled background={background}>
                <TimeContiner>{task.timeRange[0]}-{task.timeRange[1]}</TimeContiner>
                <TitleStyled>{task.title}</TitleStyled>
            <DescriptionStyled>{task.description}</DescriptionStyled>
            </TaskContentStyled>
            <SideStyled>
            <BallStyled color={background}/>
            <HorizontalContainer color={background}/>
            </SideStyled>
        </TaskStyled>
    )
}