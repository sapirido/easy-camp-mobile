import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route,Switch, withRouter } from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import { getUserSession } from './data/modules/auth/auth.actions';
import Login from './containers/Login/Login';
import Main from './containers/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import AdminPanel from './containers/Admin/AdminPanel';
import CampsEditor from './containers/camps/edit/CampsEditor';
import CreateCamp from './containers/camps/create/CreateCamp';
import CampManagerPage from './containers/employee/campManager/CampManager';
import InstructionPage from './containers/employee/instruction/Instruction';

const ContentStyled = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:100%;
height:95vh;
`

 function AppRouter({history}){
    const { activeUser } = useSelector(({auth}) => auth);
    const dispatch = useDispatch();
    useEffect(async() => {
        if(isSessionIsValide()){
          const uid = localStorage.getItem('uid');
          await dispatch(getUserSession(uid));
        }else{
          history.replace('/login');
        }
    },[])

    function isSessionIsValide(){
      var loggedInTime = localStorage.getItem('loggedIn');
      loggedInTime = Number(loggedInTime);
      const now = +new Date();
      const valideDiff = 1000 * 60 * 60 * 3;
      return now - loggedInTime < valideDiff;
    }

    const authRoutes = [
        { path: "/", component: Main, isExact: true },
        {path:"/admin",component: AdminPanel,isExact:true},
        {path:'/admin/camps/edit',component: CampsEditor,isExact:true},
        {path:'/admin/camps/create',component:CreateCamp,isExact:true},
        {path:'/employee/campManager/:mangerId',component:CampManagerPage,isExact:true},
        {path:'/employee/instruction/:instructionId',component:InstructionPage,isExact:true}
      ];
      const notAuthRoutes = [
        {path:'/login',component:Login,isExact:true},
      ]
      const routes = activeUser ? authRoutes : notAuthRoutes;
      console.log({routes})
      
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