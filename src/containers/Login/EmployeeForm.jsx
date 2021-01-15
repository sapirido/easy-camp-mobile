import React from 'react'
import {Input} from 'antd';
import {FormStyled,IconSVG} from './Login.styled';
import passwordSVG from '../../assets/images/password.svg'
import emailSVG from '../../assets/images/email.svg'
export default function EmployeeLoginForm({email,setEmail,password,setPassword}){

    return(
    <FormStyled>
        <Input  style={{marginBottom:7}} value={email} onChange={setEmail} prefix={<IconSVG src={emailSVG}/>} placeholder="אימייל" bordered={false} />
        <Input onChange={setPassword} value={password} placeholder="סיסמא" bordered={false} prefix={<IconSVG src={passwordSVG}/>} />
    </FormStyled>
    )
}