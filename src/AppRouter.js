import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route,Switch, withRouter } from "react-router";
import Login from './containers/login/Login'
import Home from './containers/home/Home';
import {useSelector, useDispatch} from 'react-redux';
import { setActiveUser } from './data/modules/auth/auth.actions';
const ContentStyled = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:100%;
height:120vh;
`

 function AppRouter({history}){

  const {activeUser} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();

  function checkSession(){
    const expired = localStorage.getItem('expired');
    const now = +new Date();
    return now - Number(expired) < 3 * 60 * 60 * 1000;
  }
  useEffect(() => {
    if(!activeUser && checkSession()){
      let activeUserLocalStorage = localStorage.getItem('activeUser');
      console.log({active:JSON.parse(activeUserLocalStorage)});
      dispatch(setActiveUser(JSON.parse(activeUserLocalStorage)));
    }
    if(!checkSession()){
      localStorage.removeItem('activeUser');
    }
    if(activeUser){
      history.push('/')
    }
  },[])
  console.log({activeUser})
  const notAuthRoute = [
    {
      component:Login,
      isExact:true,
      path:'/login'

    }
  ]

  const authRoutes = [
    {
      component:Home,
      isExact:true,
      path:'/'
    }
  ]
  const routes = activeUser ? authRoutes : [];
      
    return(
        <>
        <Switch>
          <ContentStyled className="title">
        {[...notAuthRoute,...routes].map(route => (
          <Route
            exact={route.isExact}
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))
        }
        </ContentStyled>  
        </Switch>
        </>
    )
}

export default withRouter(AppRouter);