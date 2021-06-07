import { Button, Form, Input, TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { PRIMARY, WHITE } from '../../../common/styles/colors';
import { ContentStyled, ModalContentStyled } from '../ECModal.styled';

const {RangePicker} = TimePicker;
export default function EditTaskModal({task,handleSubmit}){

    return(
        <ModalContentStyled>
        <ContentStyled>
            <Form onFinish={handleSubmit}>
                <Form.Item name="title">
                    <Input placeholder={'שם הפעילות'} defaultValue={task.title} />
                </Form.Item>
                <Form.Item name="description">
                <Input placeholder={'תיאור הפעילות'} defaultValue={task.description} />
            </Form.Item>
                <Form.Item name="timeRange">
                   <RangePicker style={{width:'100%'}} format={'HH:mm'}/>
                </Form.Item>
                <Form.Item>
                  <ButtonStyled htmlType="submit" type="primary">ערוך</ButtonStyled>
                </Form.Item>
            </Form>
        </ContentStyled>
      
      </ModalContentStyled>
    )

}

const ButtonStyled = styled(Button)`
width:80%;
margin:auto;
background-color:${WHITE};
color:${PRIMARY};
border:2px solid ${PRIMARY};
border-radius:14px;

`

