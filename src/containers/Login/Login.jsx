import React from 'react';
import {LoginStyled,HeaderStyled, TitleStyled,SelctionStyled} from './Login.styled';
import square from '../../assets/images/square.svg'
import ECSelect from '../../components/select/ECSelect';
export default function Login({}){
    const options = ['קייטנת לאה','גלגלים','קייטנת קטנטנים']
    return(
        <LoginStyled>
            <HeaderStyled>
                <TitleStyled>
                    Easy Camp
                </TitleStyled>
                <img src={square}/>
            </HeaderStyled>
            <SelctionStyled>
                <ECSelect options={options} placeholder="בחר קייטנה"/>
            </SelctionStyled>
        </LoginStyled>
    )
}