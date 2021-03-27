import React from 'react';
import {TaskStyled,HorizontalContainer,IconWrapper,TaskContentStyled,TimeContiner,TitleStyled,DescriptionStyled,SideStyled,BallStyled,TimeAndActions,ActionsStyled} from './Task.styled';
import {EditSVG,DeleteSVG} from '../../common/icons/icons';

export default function Task({background,task,allowedActions,deleteTask,editTask}){
    return(
        <TaskStyled>
            <TaskContentStyled background={background}>
                <TimeAndActions>
                    <ActionsStyled>
                        {allowedActions && (
                            <>
                            <IconWrapper onClick={deleteTask}>
                            <DeleteSVG/>
                            </IconWrapper>
                            <IconWrapper onClick={editTask}>
                            <EditSVG/>
                            </IconWrapper>
                            </>
                        )}
                    </ActionsStyled>
                 <TimeContiner>{task.timeRange[0]}-{task.timeRange[1]}</TimeContiner>
                </TimeAndActions>
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