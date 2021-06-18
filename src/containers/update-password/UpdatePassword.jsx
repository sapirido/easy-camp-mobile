import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import { SECONDARY,ERROR, PRIMARY, WHITE } from '../../common/styles/colors';
import {Button, Form, Input} from 'antd';
import HeaderPage from '../../components/header-page/HeaderPage';
import { useDispatch, useSelector } from 'react-redux';
import {updatePassword} from '../../data/modules/auth/auth.actions';
import { ContentBox } from '../feedbacks/Feedbacks.styled';
import Lottie from 'react-lottie';
import success from '../../assets/lottie/success_primary.json';
import {ButtonStyled} from '../../components/button/ECButton';




export default function UpdatePassword({history}){
    const dispatch = useDispatch();
    const {activeUser, oldPassword} = useSelector(({auth}) => auth);
    const [error,setError] = useState('');
    const [updatedSucceed,setUpdatedSucceed] = useState(false);

    useEffect(() => {
        if(activeUser?.updatedPassword){
            setUpdatedSucceed(true);
            setTimeout(() => {
                setUpdatedSucceed(false);
                history.push('/');
            },3000);
        }
    },[activeUser])

    function handleSubmit(values){
        const { password, confirmPassword } = values;
        if(password === confirmPassword){
            dispatch(updatePassword(oldPassword,password,activeUser));
        }else{
            setError('הסיסמאות אינן זהות');
        }
    }

    const defaultOptions = {
        loop:true,
        autoplay:true,
        animationData: success,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }

    return(
        <UpdatePasswordContainer>
            <HeaderPage title={'- עידכון סיסמא -'} size={1.6} color={SECONDARY}/>
            <FormContainer>
                {
                    updatedSucceed ? <ContentBox> <Lottie options={defaultOptions} height={250} width={250}/> </ContentBox> : (
                <React.Fragment>
                <Form onFinish={handleSubmit}>
                    <Form.Item  required name="password">
                        <Input.Password placeholder="סיסמא חדשה" onChange={() => setError('')}/>
                    </Form.Item>
                    <Form.Item required  onChange={() => setError('')} name="confirmPassword" >
                        <Input.Password placeholder="אימות סיסמא חדשה"/>
                    </Form.Item>
                    <Form.Item>
                    <ButtonStyled backgroundColor={PRIMARY} textColor={WHITE} borderColor={WHITE}>
                       <Button   shape={'round'} block htmlType="submit">עדכן סיסמה</Button>
                    </ButtonStyled>
                    </Form.Item>
                </Form>
                <ErrorContainer>{error}</ErrorContainer>
                </React.Fragment>
                    )
                }
                
            </FormContainer>
        </UpdatePasswordContainer>
    )
}

const UpdatePasswordContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`

const FormContainer = styled.div`
padding-top:3.5rem;
`

const ErrorContainer = styled.div`
color:${ERROR};
`