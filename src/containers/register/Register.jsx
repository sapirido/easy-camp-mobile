import React,{useEffect, useState} from 'react';
import {RegisterStyled,ContentStyled} from './Register.styled';
import HeaderLogin from '../../components/login-register-header/ECHeaderLogin';
import { getMasterCamps,setSelectedMasterCamp } from '../../data/modules/master.camp/masterCamps.action';
import {IconSVG} from '../../common/styles/common.styled';
import {Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import fullNameSVG from '../../assets/icons/fullname.svg'
import emailSVG from '../../assets/icons/email.svg';
import passwordSVG from '../../assets/icons/password.svg';
import { ButtonsStyled } from '../login/Login.styled';
import ECButton from '../../components/button/ECButton';
import {PRIMARY,WHITE} from '../../common/styles/colors';
import { registerParent } from '../../data/modules/auth/auth.actions';

export default function Register({history}){
    const dispatch = useDispatch();
    const { masterCamps } = useSelector(({masterCamp}) => masterCamp);
    const [fullName,setFullName] = useState('');
    const [childId,setChildId] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')

    useEffect(()=>{
        dispatch(getMasterCamps());
    },[]);

    function handleCampSelected(optionSelected){
        const campSelected = masterCamps.find(camp => camp.campName === optionSelected);
        dispatch(setSelectedMasterCamp(campSelected));
        localStorage.setItem('campCode',campSelected.campCode);
    }

    function onRegister(){
        if(password === confirmPassword){            
            const parent = {
                name:fullName,
                childId,
                email,
                password,
                role:1
            }
            dispatch(registerParent(parent));
            history.push('/');
        }

    }
const options = masterCamps?.map(camp => camp.campName)
return(
    <RegisterStyled>
        <HeaderLogin options={options} handleCampSelected={handleCampSelected}/>
        <ContentStyled>
        <Input required  style={{marginBottom:10}} value={fullName} onChange={e => setFullName(e.target.value)} prefix={<IconSVG src={fullNameSVG}/>} placeholder="שם מלא" />
        <Input required  style={{marginBottom:10}} value={childId} onChange={e => setChildId(e.target.value)} placeholder="מספר ת.ז ילד" />
        <Input required  style={{marginBottom:10}} value={email} onChange={e => setEmail(e.target.value)} prefix={<IconSVG src={emailSVG}/>} placeholder="אימייל"  />
        <Input required type="password" style={{marginBottom:10}} value={password} onChange={e => setPassword(e.target.value)} prefix={<IconSVG src={passwordSVG}/>} placeholder="סיסמא"  />
        <Input required  type="password" style={{marginBottom:10}} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="שם מלא"  />
        </ContentStyled>
        <ButtonsStyled>
        <ECButton handleClicked={onRegister} backgroundColor={PRIMARY} textColor={WHITE} buttonText={'צור משתמש'}/>
        </ButtonsStyled>
    </RegisterStyled>
)

}