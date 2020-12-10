import React from 'react';
import {DeleteStyled,ButtonsContainer} from './ScheduleTasks.styled';
import { Button } from 'antd';

export default function DeleteSchedule({deleteSchdule,closeModal}){

    return(
        <DeleteStyled>
            <span>האם הנך מעוניין למחוק יום פעילות זה?</span>
            <ButtonsContainer>
                <Button type='primary' style={{backgroundColor:'red',borderColor:'red',marginLeft:15}} onClick={deleteSchdule}>מחק</Button>
                <Button type="primary" onClick={closeModal}>סגור</Button>
            </ButtonsContainer>
        </DeleteStyled>
    )
}