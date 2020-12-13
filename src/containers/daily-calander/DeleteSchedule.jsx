import React from 'react';
import {DeleteStyled,ButtonsContainer} from './ScheduleTasks.styled';
import { Button } from 'antd';

export default function DeleteSchedule({deleteSchedule,closeModal}){

    return(
        <DeleteStyled>
            <span>האם הנך מעוניין למחוק יום פעילות זה?</span>
            <ButtonsContainer>
                <Button type='primary' style={{backgroundColor:'red',borderColor:'red',marginLeft:15}} onClick={deleteSchedule}>מחק</Button>
                <Button type="primary" onClick={closeModal}>סגור</Button>
            </ButtonsContainer>
        </DeleteStyled>
    )
}