import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route,Switch, withRouter } from "react-router";
// import Login from './containers/login/Login'
const ContentStyled = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:100%;
height:120vh;
`

 function AppRouter({history}){

  // const routes = [
  //   {
  //     component:Login,
  //     isExact:true,
  //     path:'/login'

  //   }
  // ]
      
    return(
        <>
        <Switch>
          <ContentStyled className="title">
        {/* {routes.map(route => (
          <Route
            exact={route.isExact}
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))
        } */}
        Almoni!!
        </ContentStyled>  
        </Switch>
        </>
    )
}

export default withRouter(AppRouter);