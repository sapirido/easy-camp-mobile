import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRIMARY, WHITE } from '../../common/styles/colors';
import ECButton from '../../components/button/ECButton';
import HeaderLogin from '../../components/login-register-header/ECHeaderLogin';
import { onEmployeeLogin, onParentLogin } from '../../data/modules/auth/auth.actions';
import { getMasterCamps, setSelectedMasterCamp } from '../../data/modules/master.camp/masterCamps.action';
import EmployeeLoginForm from './EmployeeForm';
import { ButtonsStyled, LoginStyled } from './Login.styled';
import ParentLoginForm from './ParentForm';
import GreetingPopup from './GreetingPopup';
import { PERMISSIONS } from '../../common/constants';

export default function Login({history}){
    const [userType,setUserType] = useState(false);
    const { masterCamps, selectedMasterCamp } = useSelector(({masterCamp}) => masterCamp);
    const {activeUser} = useSelector(({ auth }) => auth);
    const [childId,setChildId] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    //
    const [showGreeting, setShowGreeting] = useState(false)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getMasterCamps());
    },[])

    useEffect(()=>{
        if((activeUser && activeUser?.updatedPassword) || activeUser?.role === PERMISSIONS.PARENT){
            history.push('/');
            return;
        } 
        if (activeUser && !activeUser?.updatedPassword){
            history.push('/update-password');
            return;
        }
    },[activeUser])

    function handleChecked(checked){
        setUserType(checked);
    }


async function onLogin(){
    if(userType){
        if(email && password){
            try{
                await dispatch(onEmployeeLogin(email,password))
            }catch(err){
                console.error('err',err);
                alert(err);
            }
        } else {
            alert('אנא הזן שם אימייל וסיסמה');
            return null
        }
    }else{
        if(childId && password){
            await dispatch(onParentLogin(childId,password))
        }else{
            alert('אנא הזן תעודת זהות של ילדך וסיסמה');
            return null
        }

    }
}



function handleCampSelected(optionSelected){
    const campSelected = masterCamps.find(camp => camp.campName === optionSelected);
    dispatch(setSelectedMasterCamp(campSelected));
    localStorage.setItem('campCode',campSelected.campCode);
}

function createParentUser(){
history.push('/register');
}

const disabled = !(selectedMasterCamp && ((childId || email) && password))
const options = masterCamps?.map(camp => camp.campName)

    return(
        <React.Fragment>
            <LoginStyled>
                <HeaderLogin userType={userType} options={options} handleCampSelected={handleCampSelected} isLogin handleChecked={handleChecked}/>
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
                    <ECButton disabled={disabled} handleClicked={onLogin} backgroundColor={PRIMARY} textColor={WHITE} buttonText={'כניסה'}/>
                    {!userType && <ECButton style={{marginTop:'1.2rem'}} handleClicked={createParentUser} backgroundColor={WHITE} textColor={PRIMARY} borderColor={PRIMARY} buttonText={'צור משתמש'}/>}
                </ButtonsStyled>
            </LoginStyled>
        </React.Fragment>
    )
}