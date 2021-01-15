import React,{useState} from 'react';
import {LoginStyled,HeaderStyled, TitleStyled,SelctionStyled,IconStyled,ButtonsStyled} from './Login.styled';
import square from '../../assets/images/square.svg'
import ECSelect from '../../components/select/ECSelect';
import Switch from "react-switch";
import { PRIMARY, WHITE } from '../../common/styles/colors';
import ParentLoginForm from './ParentForm';
import EmployeeLoginForm from './EmployeeForm';
import ECButton from '../../components/button/ECButton';

export default function Login({}){
    const [userType,setUserType] = useState(false);
    const options = ['קייטנת לאה','גלגלים','קייטנת קטנטנים']

    function handleChecked(checked){
        setUserType(checked);
    }

function Icon({label}){
    return (<IconStyled>{label}</IconStyled>)
} 

function onLogin(){
    console.log('login');
}
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
            </SelctionStyled>
            {userType ?  <EmployeeLoginForm/> : <ParentLoginForm/> }
            <ButtonsStyled>
                <ECButton handleClicked={onLogin} backgroundColor={PRIMARY} textColor={WHITE} buttonText={'כניסה'}/>
            </ButtonsStyled>
        </LoginStyled>
    )
}