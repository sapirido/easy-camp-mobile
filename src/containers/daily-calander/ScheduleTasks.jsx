import React from 'react';
import {TasksStyled} from './ScheduleTasks.styled';
import Task from './Task';
export default function ScheduleTasks({tasks,editTask,deleteTask}){

    return(
        <TasksStyled>
            {tasks.map((task,index)=><Task task={task} deleteTask={deleteTask} editTask={(task)=>editTask(task)} key={index}/>)}
        </TasksStyled>
    )
}