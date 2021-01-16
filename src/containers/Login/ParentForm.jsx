import React from 'react';
import {Input} from 'antd';
import {FormStyled,IconSVG} from './Login.styled';
import passwordSVG from '../../assets/images/password.svg';
import childSVG from '../../assets/images/child_id.svg';
import styled from 'styled-components';


export default function ParentLoginForm({id,setId,password,setPassword}){

    return(
        <FormStyled>
            <Input required  style={{marginBottom:7}} value={id} onChange={setId} prefix={<IconSVG src={childSVG}/>} placeholder="ת.ז ילד" bordered={false} />
            <Input type="password" required onChange={setPassword} value={password} placeholder="סיסמא" bordered={false} prefix={<IconSVG src={passwordSVG}/>} />
        </FormStyled>
    )
}