import React, { useState } from 'react';
import {TaskStyled,TaskTitle,TaskDiscription,TitleAndTimeStyled,TimeIcon,TimeStyled,TimeText,DescWithActions,ActionsStyled} from './ScheduleTasks.styled';
import { ClockCircleOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';


export default function Task({task,editTask}){
const [deleteVisible,setDeleteVisible] = useState(false);
const [editVisible,setEditVisible] = useState(false);

    return(
        <TaskStyled>
            <TitleAndTimeStyled>
            <TaskTitle>
                {task.title}
            </TaskTitle>
            <TimeStyled>
              <TimeText>{task.timeRange[0]} - {task.timeRange[1]}</TimeText>
              <TimeIcon>
                <ClockCircleOutlined />
              </TimeIcon>
            </TimeStyled>
            </TitleAndTimeStyled>
            <DescWithActions>
            <TaskDiscription>
                {task.description}
            </TaskDiscription>
            <ActionsStyled>
                <DeleteOutlined  style={{paddingLeft:6,cursor:'pointer',color:'red'}}/>
                <EditOutlined onClick={()=>editTask(task)} style={{cursor:'pointer',color:'blue'}}/>
            </ActionsStyled>
            </DescWithActions>
        </TaskStyled>
    )
}