import React,{Fragment} from 'react';
import styled from 'styled-components';
import {HeaderStyled,TitleStyled,SelctionStyled,IconStyled} from '../../containers/login/Login.styled';
import ECSelect from '../select/ECSelect';
import Switch from "react-switch";
import square from '../../assets/icons/square.svg'
import { PRIMARY } from '../../common/styles/colors';

export default function HeaderLogin({
    options,
    handleCampSelected,
    isLogin = false,
    userType = false,
    handleChecked = () => {}
}){
        function Icon({label}){
            return (<IconStyled>{label}</IconStyled>)
        }   
  
    return (
        <Fragment>
        <HeaderStyled>
        {/* <TitleStyled>
            Easy Camp
        </TitleStyled> */}
        <Logo/>
        {/* <img style={{height:'7rem'}} src={'/images/logo_big.svg'}/> */}
    </HeaderStyled>
    <SelctionStyled>
                <ECSelect options={options} handleSelect={handleCampSelected} placeholder="בחר קייטנה"/>
               {isLogin && (
                <Switch 
                width={167}
                height={32}
                onChange={handleChecked}
                checked={userType} 
                offColor={PRIMARY} 
                onColor={PRIMARY} 
                borderRadius={16} 
                uncheckedIcon={<Icon justifyContent={'left'} width={'3rem'} label={'הורה'}/>} 
                checkedIcon={<Icon label={'עובד צוות'}/>}
                />
               )} 
            </SelctionStyled>
    </Fragment>
    )
}

const Logo = styled.div`
  background-image:url('/images/logo_big.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width:140px;
  height:140px;
`