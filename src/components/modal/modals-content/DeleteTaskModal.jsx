import React from 'react';
import {ModalContentStyled,ButtonsStyled,ContentStyled} from '../ECModal.styled';
import ECButton from '../../button/ECButton';
import { PRIMARY, WHITE } from '../../../common/styles/colors';

export default function DeleteTaskModal({taskName,onTaskDelete,onCancel}){

  return(
    <ModalContentStyled>
      <ContentStyled>
        האם את/ה בטוח/ה שברצונך למחוק את הפעילות - {taskName}
      </ContentStyled>
      <ButtonsStyled>
        <ECButton handleClicked={onTaskDelete} buttonText={'מחק'} backgroundColor={PRIMARY} textColor={WHITE}/>
        <ECButton handleClicked={onCancel} buttonText={'בטל'} backgroundColor={PRIMARY} textColor={WHITE}/>
      </ButtonsStyled>
    </ModalContentStyled>
  )
}