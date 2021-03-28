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

const { Content } = Layout;

const ContentStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
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
];

function AppRouter({ history }) {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const { activeUser } = useSelector(({ auth }) => auth);
  const { modalState } = useSelector(({ modal }) => modal);

  useEffect(() => {
    const user = checkActiveUser(activeUser);
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

  const routes = activeUser ? authRoutes : [];
  console.log({ activeUser });
  const { type, title, isVisible, onCancel, content, onOk } = modalState;
  return (
    <Layout
      style={{ display: 'flex', background: `${WHITE}`, padding: '20px 0px' }}
    >
      <ECSideBar
        setCollapsed={setCollapsed}
        activeUser={activeUser}
        collapsed={collapsed}
      />
      <Content onClick={() => setCollapsed(true)} style={{ direction: 'ltr' }}>
        <ECModal
          type={type}
          title={title}
          isVisible={isVisible}
          onCancel={onCancel}
          content={content}
          onOk={onOk}
        />
        {activeUser && (
          <MenuStyled>
            <MenuOutlined
              onClick={handleMenuClicked}
              style={{ fontSize: 24 }}
            />
            <NameStlyed>קייטנת לאה</NameStlyed>
          </MenuStyled>
        )}

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
      </Content>
    </Layout>
  );
}

export default withRouter(AppRouter);
