import React from 'react';
import {DeleteStyled,ButtonsContainer} from './ScheduleTasks.styled';
import { Button } from 'antd';

export default function DeleteTask({task,deleteTask,closeModal}){

    return(
        <DeleteStyled>
            <span>האם אתה בטוח כי ברצונך למחוק פעילות זו?</span>
            <ButtonsContainer>
                <Button type='primary' style={{backgroundColor:'red',borderColor:'red',marginLeft:15}} onClick={deleteTask}>מחק</Button>
                <Button type="primary" onClick={closeModal}>סגור</Button>
            </ButtonsContainer>
        </DeleteStyled>
    )
}