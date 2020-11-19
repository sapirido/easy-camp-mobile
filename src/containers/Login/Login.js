import { Icon } from '@ant-design/compatible';
import { Button, Card } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FlexDivCenter, Text } from '../../components/Typography/Typography';
import { loginAction } from '../../data/modules/auth/auth.actions';
import { LoginStyled } from './Login.styled';

export default ({history}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  async function onLogin() {
    try {
  const user = await dispatch(loginAction());
    if(user){
        history.replace('/');
    }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <LoginStyled>
      <Card style={{zIndex:10,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Text size="title">{t('welcome_to_easy_camp')}</Text>
        <FlexDivCenter>
          <Button margin="5px" onClick={onLogin}>{t('login')} <Icon inButton type="login"/></Button> 
        </FlexDivCenter>
      </Card>
    </LoginStyled>
  );
};