import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'antd';
import { Icon } from '@ant-design/compatible';
import { MainWrapper } from './Main.styled';
import { changeLanguage, getActiveLanguage } from '../../config/translations/utils';
import { Text, FlexDivCenter } from '../../components/Typography/Typography';
import { loginAction } from '../../data/modules/auth/auth.actions';
import Sidebar from '../../components/Sidebar/Sidebar';

export default () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { activeUser } = useSelector(store => store.auth);

  function onToggleLanguage() {
    return getActiveLanguage() === 'en'
      ? changeLanguage('he')
      : changeLanguage('en');
  }

  useEffect(()=>{
    console.log({activeUserFromMain:activeUser})
  },[])

  async function onLogin() {
    try {
      dispatch(loginAction());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MainWrapper>
    </MainWrapper>
  );
};