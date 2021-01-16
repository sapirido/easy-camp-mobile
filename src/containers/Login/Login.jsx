import React,{useState,useEffect} from 'react';
import {LoginStyled,HeaderStyled, TitleStyled,SelctionStyled,IconStyled,ButtonsStyled} from './Login.styled';
import square from '../../assets/images/square.svg'
import ECSelect from '../../components/select/ECSelect';
import Switch from "react-switch";
import { PRIMARY, WHITE } from '../../common/styles/colors';
import ParentLoginForm from './ParentForm';
import EmployeeLoginForm from './EmployeeForm';
import ECButton from '../../components/button/ECButton';
import { useSelector,useDispatch } from 'react-redux';
import { getMasterCamps,setSelectedMasterCamp } from '../../data/modules/master.camp/masterCamps.action';
import {onParentLogin,onEmployeeLogin} from '../../data/modules/auth/auth.actions';

export default function Login({history}){
    const [userType,setUserType] = useState(false);
    const { masterCamps } = useSelector(({masterCamp}) => masterCamp);
    const {activeUser} = useSelector(({ auth }) => auth);
    const [childId,setChildId] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getMasterCamps());
    },[])

    useEffect(()=>{
        if(activeUser){
            history.push('/');
        }
    },[activeUser])

    function handleChecked(checked){
        setUserType(checked);
    }

function Icon({label}){
    return (<IconStyled>{label}</IconStyled>)
} 

async function onLogin(){
    setLoading(true);
    if(userType){
        email && password ? dispatch(onEmployeeLogin(email,password)) : alert('אנא הזן שם אימייל וסיסמה');
    }else{
        childId && password ? dispatch(onParentLogin(childId,password)) : alert('אנא הזן תעודת זהות של ילדך וסיסמה');
    }
    setLoading(false);
}



function handleCampSelected(optionSelected){
    const campSelected = masterCamps.find(camp => camp.campName === optionSelected);
    dispatch(setSelectedMasterCamp(campSelected));
    localStorage.setItem('campCode',campSelected.campCode);
}

function createParentUser(){

}


console.log({activeUser})
const options = masterCamps?.map(camp => camp.campName)
console.log({options})
    return(
        <LoginStyled>
            <HeaderStyled>
                <TitleStyled>
                    Easy Camp
                </TitleStyled>
                <img src={square}/>
            </HeaderStyled>
            <SelctionStyled>
                <ECSelect options={options} handleSelect={handleCampSelected} placeholder="בחר קייטנה"/>
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
            {userType ?  
            <EmployeeLoginForm 
            email={email} 
            setEmail={e => setEmail(e.target.value)} 
            password={password} 
            setPassword={(e) => setPassword(e.target.value)}/> 
            :<ParentLoginForm 
            id={childId} 
            setId={(e) => setChildId(e.target.value)} 
            password={password} 
            setPassword={(e) => setPassword(e.target.value)}
            />
             }
            <ButtonsStyled>
                <ECButton loading={loading}  handleClicked={onLogin} backgroundColor={PRIMARY} textColor={WHITE} buttonText={'כניסה'}/>
                {!userType && <ECButton style={{marginTop:'1.2rem'}} handleClicked={createParentUser} backgroundColor={WHITE} textColor={PRIMARY} borderColor={PRIMARY} buttonText={'צור משתמש'}/>}
            </ButtonsStyled>
        </LoginStyled>
    )
}