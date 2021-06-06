import React, {useState} from 'react';
import styled from 'styled-components';
import { Input,Form,TimePicker, Button } from 'antd';
import { PRIMARY, WHITE } from '../../../common/styles/colors';

import ECButton from '../../button/ECButton';
import { ButtonsStyled, ModalContentStyled,ContentStyled } from '../ECModal.styled';

const {RangePicker} = TimePicker;
export default function EditTaskModal({task}){

    // const [taskName,setTaskName] = useState(task.title);


    function handleSubmit(values) {
        console.log({values});
    }

    return(
        <ModalContentStyled>
        <ContentStyled>
            <Form onFinish={handleSubmit}>
                <Form.Item name="taskName">
                    <Input placeholder={'שם הפעילות'} value={task.title}/>
                </Form.Item>
                <Form.Item name="timeRange">
                   <RangePicker format={'HH:mm'} />
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

