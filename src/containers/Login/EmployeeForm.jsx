import React from 'react'
import {Input} from 'antd';
import {FormStyled} from './Login.styled';
import {IconSVG} from '../../common/styles/common.styled';
import passwordSVG from '../../assets/icons/password.svg'
import emailSVG from '../../assets/icons/email.svg'
export default function EmployeeLoginForm({email,setEmail,password,setPassword}){

    return(
    <FormStyled>
        <Input required  style={{marginBottom:7}} value={email} onChange={setEmail} prefix={<IconSVG src={emailSVG}/>} placeholder="אימייל" bordered={false} />
        <Input required type="password" onChange={setPassword} value={password} placeholder="סיסמא" bordered={false} prefix={<IconSVG src={passwordSVG}/>} />
    </FormStyled>
    )
}