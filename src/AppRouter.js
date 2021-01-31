import React, { useEffect,useState } from 'react';
import styled from 'styled-components';
import { Route,Switch, withRouter } from "react-router";
import Login from './containers/login/Login'
import Home from './containers/home/Home';
import {useSelector, useDispatch} from 'react-redux';
import { setActiveUser } from './data/modules/auth/auth.actions';
import {checkActiveUser} from './common/utils';
import {Layout,Menu, Divider} from 'antd';
import {AppStyled} from './App.styled' 
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { PRIMARY, WHITE } from './common/styles/colors';
import Register from './containers/register/Register';
import ECSideBar from './components/sidebar/Sidebar';
import GeneralSchedule from './containers/general-schedule/GeneralSchedule';



const {Sider,Content} = Layout;

const ContentStyled = styled.div`
display:flex;
justify-content: center;
align-items: center;
width:100%;
height:120vh;
padding:2rem;
`

const MenuStyled = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
align-items:center;
direction:rtl;
padding:20px;
`

const NameStlyed = styled.div`
font-size:2rem;
color:${PRIMARY};
margin-right:5rem;
`

 function AppRouter({history}){

  const {activeUser} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();
  const [opened,setOpened] = useState(true);

 
  useEffect(() => {
    const user = checkActiveUser(activeUser);
    if(user){
      dispatch(setActiveUser(user));
      history.push('/');
      return;
    }
    history.push('/login')
  },[])
  const notAuthRoute = [
    {
      component:Login,
      isExact:true,
      path:'/login'

    },
    {
      component:Register,
      isExact:true,
      path:'/register'
    }
  ]

  function handleMenuClicked(e){
    e.stopPropagation()
    setOpened(!opened);
  }

  const authRoutes = [
    {
      component:Home,
      isExact:true,
      path:'/'
    },
    {
      component:GeneralSchedule,
      isExact:true,
      path:'/general-schdule'
    }
  ]

  const handleRouteChanged = (path) => history.push(path);
  const routes = activeUser ? authRoutes : [];
     console.log({activeUser}) 
    return(
  <Layout style={{display:"flex",flexDirection:'column',background:`${WHITE}`}}>
       <ECSideBar activeUser={activeUser} handleRouteChanged={handleRouteChanged} opened={opened}/>
       <Content onClick={()=>setOpened(true)} style={{direction:'ltr'}}>
          {
            activeUser &&
            (<MenuStyled>
            <MenuOutlined onClick={handleMenuClicked} style={{fontSize:24}}/>
            <NameStlyed>
              קייטנת לאה
            </NameStlyed>
          </MenuStyled>)
          }
        
        <Switch>
          <ContentStyled>
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
      </Content>
  </Layout>
    )
}

export default withRouter(AppRouter);