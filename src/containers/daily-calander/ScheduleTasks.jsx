import React from 'react';
import {TasksStyled} from './ScheduleTasks.styled';
import Task from './Task';
export default function ScheduleTasks({tasks,editTask}){

    return(
        <TasksStyled>
            {tasks.map((task,index)=><Task task={task} editTask={(task)=>editTask(task)} key={index}/>)}
        </TasksStyled>
    )
}