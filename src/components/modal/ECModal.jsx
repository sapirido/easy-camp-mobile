import React from 'react';
import { Modal } from 'antd';
import { MODAL_TYPES } from '../../common/constants';
import {ModalGlobalStyled} from './ECModal.styled';
//rgba(33, 158, 188,0.6);

export default function ECModal({type,title,isVisible,onCancel,content,onOk = ()=>{}}){

  function renderModalByType(){
    switch(type){
      case MODAL_TYPES.DANGER:
        return(
          <Modal footer={null} title={title} visible={isVisible} onCancel={onCancel}>
            {content}
          </Modal>
        )
      case MODAL_TYPES.ALERT:
        return (
          <Modal footer={null} visible={isVisible} onCancel={onCancel}>
            {content}
          </Modal>
        )
      case MODAL_TYPES.EDIT:
        return (
          <Modal footer={null} visible={isVisible} onCancel={onCancel}>
          {content}
          </Modal>
        )
      default:
        return null;
    }
  }
  return(
    <React.Fragment>
      <ModalGlobalStyled/>
      {renderModalByType()}
    </React.Fragment>
  )
}