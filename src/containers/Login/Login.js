import React,{useState} from 'react';
import { Icon } from '@ant-design/compatible';
import { Button, Card, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FlexDivCenter, Text } from '../../components/Typography/Typography';
import { loginAction, verifyUser } from '../../data/modules/auth/auth.actions';
import { LoginStyled } from './Login.styled';


export default ({history}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isAuth,setIsAuth] = useState(false);
  const [user,setUser] = useState(null);
  const [userId,setUserId] = useState('');
  async function onLogin() {
    try {
  const user = await dispatch(loginAction());
    if(user){
        // history.replace('/');
        setUser(user);
        setIsAuth(true);
    }
    } catch (err) {
      console.log(err);
    }
  }

  async function onUserIdVerify(){
    if(userId){
      const userData = {
        id:userId,
        ...user
      }
      const userExist = await dispatch(verifyUser(userData));
      if(userExist){
        history.replace('/');
      }else{
        message.error('תעודת זהות זו אינה רשומה במערכת')
      }
    }
  }
  return (
    <LoginStyled>
      <Card style={{zIndex:10,display:'flex',justifyContent:'center',alignItems:'center'}}>
        {isAuth  ? (
          <>
          <Text size="title">אימות משתמש</Text>
          <Input width={200} style={{marginBottom:20}} placeholder={'הזן תעודת זהות'} value={userId} onChange={(e)=>setUserId(e.target.value)}/>
          <FlexDivCenter>
          <Button margin="5px" onClick={onUserIdVerify}>{t('login')} <Icon inButton type="login"/></Button> 
        </FlexDivCenter>
          </>
        ):(
          <>
        <Text size="title">{t('welcome_to_easy_camp')}</Text>
        <FlexDivCenter>
          <Button margin="5px" onClick={onLogin}>{t('login')} <Icon inButton type="login"/></Button> 
        </FlexDivCenter>
        </>
        )}
      </Card>
    </LoginStyled>
  );
};