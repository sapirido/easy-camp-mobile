import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import styled from 'styled-components';
import { PRIMARY, WHITE } from './common/styles/colors';
import { checkActiveUser } from './common/utils';
import ECSideBar from './components/sidebar/Sidebar';
import GeneralSchedule from './containers/general-schedule/GeneralSchedule';
import Home from './containers/home/Home';
import Login from './containers/login/Login';
import Register from './containers/register/Register';
import { setActiveUser } from './data/modules/auth/auth.actions';
import ContactList from './containers/contact-list/ContactList';
import TransferReport from './containers/transfer-reports/TransferReport';
import ECModal from './components/modal/ECModal';
import Feedbacks from './containers/feedbacks/Feedbacks';
import Feedback  from './containers/feedbacks/Feedback';

const { Content } = Layout;

const ContentStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1.2rem 2rem;
  align-items:flex-start;
`;

const MenuStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  direction: rtl;
  padding: 20px;
`;

const NameStlyed = styled.div`
  font-size: 2rem;
  color: ${PRIMARY};
  margin-right: 5rem;
`;

const LayoutStyled = styled(Layout)`
background-color:white;
display:flex;
grid-gap:0px;
`
const ContentWrapper = styled(Content)`
display:grid;
grid-template-rows:100px auto;
grid-gap:40px;
/* margin-top:20px; */
`


const notAuthRoute = [
  {
    component: Login,
    isExact: true,
    path: '/login',
  },
  {
    component: Register,
    isExact: true,
    path: '/register',
  },
];

const authRoutes = [
  {
    component: Home,
    isExact: true,
    path: '/',
  },
  {
    component: GeneralSchedule,
    isExact: true,
    path: '/general-schedule',
  },
  {
    component: ContactList,
    isExact: true,
    path: '/contact-list',
  },
  {
    component: TransferReport,
    isExact: true,
    path: '/transfer-report',
  },
  {
    component:Feedbacks,
    isExact:true,
    path:'/feedbacks'
  },
  {
    component:Feedback,
    isExact:true,
    path:'/feedbacks/:week'
  }
];

function AppRouter({ history }) {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const { activeUser } = useSelector(({ auth }) => auth);
  const { modalState } = useSelector(({ modal }) => modal);
  useEffect(() => {
    const user = checkActiveUser(activeUser);
    console.log({user});
    if (user) {
      dispatch(setActiveUser(user));
      history.push('/');
      return;
    }
    history.push('/login');
  }, []);

  function handleMenuClicked(e) {
    e.stopPropagation();
    setCollapsed(!collapsed);
  }

  console.log({history:history.location})

  const notAllowedPath = ['/login','/register'];
  const routes = activeUser ? authRoutes : [];
  const { type, title, isVisible, onCancel, content, onOk } = modalState;
  return (
  <LayoutStyled>
  
      <ECSideBar
        setCollapsed={setCollapsed}
        activeUser={activeUser}
        collapsed={collapsed}
      />
      <ContentWrapper onClick={() => setCollapsed(true)} style={{ direction: 'ltr' }}> 
      {!notAllowedPath.includes(history.location.pathname) && (
        <MenuStyled>
        <MenuOutlined
          onClick={handleMenuClicked}
          style={{ fontSize: 24 }}
        />
        <NameStlyed>קייטנת לאה</NameStlyed>
      </MenuStyled>
      )}
        
        <ECModal
          type={type}
          title={title}
          isVisible={isVisible}
          onCancel={onCancel}
          content={content}
          onOk={onOk}
        />
     

        <Switch>
          <ContentStyled>
            {[...notAuthRoute, ...routes].map((route) => (
              <Route
                exact={route.isExact}
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
          </ContentStyled>
        </Switch>
      </ContentWrapper>
    </LayoutStyled>
  );
}

export default withRouter(AppRouter);
