import React from 'react';
import {Input} from 'antd';
import {FormStyled} from './Login.styled';
import {IconSVG} from '../../common/styles/common.styled';
import passwordSVG from '../../assets/icons/password.svg';
import fullnameSVG from '../../assets/icons/fullname.svg';


export default function ParentLoginForm({id,setId,password,setPassword}){

    return(
        <FormStyled>
            <Input required  style={{marginBottom:7}} value={id} type="number" onChange={setId} prefix={<IconSVG src={fullnameSVG}/>} placeholder="ת.ז ילד" bordered={false} />
            <Input type="password" required onChange={setPassword} value={password} placeholder="סיסמא" bordered={false} prefix={<IconSVG src={passwordSVG}/>} />
        </FormStyled>
    )
}