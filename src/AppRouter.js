import React, { useEffect } from 'react';
import { Route,Switch, withRouter } from "react-router";
import {useSelector} from 'react-redux';
import Login from './containers/Login/Login';
import Main from './containers/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import styled from 'styled-components';

const ContentStyled = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:100%;
height:95vh;
`

 function AppRouter({history}){
    const { activeUser } = useSelector(store => store.auth);
    useEffect(()=>{
        if(!activeUser){
            history.replace('/login')
        }
    },[])

    const authRoutes = [
        { path: "/", component: Main, isExact: true },
      ];
      const notAuthRoutes = [
        {path:'/login',component:Login,isExact:true},
      ]

      const routes = activeUser ? authRoutes : notAuthRoutes;
      console.log({routes});
      
    return(
        <>
        {activeUser && <Sidebar/>}
        <Switch>
          <ContentStyled>
        {routes.map(route => (
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