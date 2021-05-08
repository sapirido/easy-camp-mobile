import { Divider, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  AboutSVG,
  CalendarSVG,
  ClockSVG,
  ContactSVG,
  LogoutSVG,
  ReportSVG,
  WeeklyFeefbackSVG,
  ImageSVG,
} from '../../common/icons/icons';
import { PRIMARY, SECONDARY, WHITE } from '../../common/styles/colors';
import { withRouter } from 'react-router';
import { PERMISSIONS } from '../../common/constants';
import { useDispatch } from 'react-redux';
import { setActiveUser } from '../../data/modules/auth/auth.actions';

const { Sider } = Layout;

const ContentItem = ({ text, iconComponent }) => (
  <ItemContent>
    <IconWrapper>{iconComponent}</IconWrapper>
    <TextWrapper>{text}</TextWrapper>
  </ItemContent>
);

function renderRole(role) {
  switch (role) {
    case 1:
      return 'הורה';
    case 2:
      return 'מדריך';
    case 3:
      return 'רכז נסיעות';
    case 4:
      return 'רכז מחנה';
    case 5:
      return 'רכז כללי';
    case 6:
      return 'מנהל';
  }
}


function ECSidebar({ history, collapsed, activeUser, setCollapsed }) {
  const [selectedKey, setSelectedKey] = useState('1');
  const dispatch = useDispatch();

  function handleSelect(e) {
    setSelectedKey(e.key);
  }

  function handleClicked(path) {
    setCollapsed(true);
    history.push(path);
  }

  function handleLogout() {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('expired');
    dispatch(setActiveUser(null));
    history.push('/login');
  }
  const SideBarHeader = () => (
    <HeaderWrapper>
      <IconWrapper>
        <ImageSVG />
      </IconWrapper>

      <HeaderContent>
        <NameText>{activeUser?.name}</NameText>
        <RoleWrapper>
          {activeUser ? renderRole(activeUser.role) : null}
        </RoleWrapper>
      </HeaderContent>
    </HeaderWrapper>
  );
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        right: 0,
        direction: 'rtl',
        backgroundColor: `${PRIMARY}`,
        zIndex: 1000,
      }}
      collapsed={collapsed}
      collapsedWidth={0}
      collapsible
    >
      <Menu
        style={{ backgroundColor: `${PRIMARY}` }}
        mode="inline"
        defaultSelectedKeys={['1']}
        onSelect={handleSelect}
      >
        <ItemGlobal />
        <SideBarHeader />
        <DividerWrapper>
          <Divider style={{ 'background-color': 'white' }} />
        </DividerWrapper>
        <Menu.Item
          style={selectedKey === '1' ? selectedStyled : unSelectedStyled}
          key="1"
          onSelect={setSelectedKey}
          onClick={() => handleClicked('/')}
        >
          <ContentItem
            text={'לו״ז יומי'}
            iconComponent={
              <ClockSVG color={selectedKey === '1' ? SECONDARY : WHITE} />
            }
          />
        </Menu.Item>
        <Menu.Item
          style={selectedKey === '2' ? selectedStyled : unSelectedStyled}
          key="2"
          onClick={() => handleClicked('/general-schedule')}
          onSelect={handleSelect}
        >
          <ContentItem
            text={'תוכנית קייטנה'}
            iconComponent={
              <CalendarSVG color={selectedKey === '2' ? SECONDARY : WHITE} />
            }
          />
        </Menu.Item>
          <React.Fragment>
            <Menu.Item
              style={selectedKey === '3' ? selectedStyled : unSelectedStyled}
              key="3"
              onClick={() => handleClicked('/transfer-report')}
              onSelect={handleSelect}
            >
              <ContentItem
                iconComponent={
                  <ReportSVG color={selectedKey === '3' ? SECONDARY : WHITE} />
                }
                text={'דיווח הסעות'}
              />
            </Menu.Item>
           {activeUser?.role === PERMISSIONS.PARENT && <Menu.Item
              style={selectedKey === '4' ? selectedStyled : unSelectedStyled}
              key="4"
              onSelect={handleSelect}
              onClick={() => handleClicked('/feedbacks')}
            >
              <ContentItem
                iconComponent={
                  <WeeklyFeefbackSVG
                    color={selectedKey === '4' ? SECONDARY : WHITE}
                  />
                }
                text={'משו״ב שבועי'}
              />
            </Menu.Item>}
            <DividerWrapper>
              <Divider style={{ 'background-color': 'white' }} />
            </DividerWrapper>
            <Menu.Item
              style={selectedKey === '5' ? selectedStyled : unSelectedStyled}
              key="5"
              onSelect={handleSelect}
            >
              <ContentItem
                iconComponent={
                  <AboutSVG color={selectedKey === '5' ? SECONDARY : WHITE} />
                }
                text={'אודות'}
              />
            </Menu.Item>
            <Menu.Item
              style={selectedKey === '6' ? selectedStyled : unSelectedStyled}
              onSelect={handleSelect}
              onClick={() => handleClicked('/contact-list')}
              key="6"
            >
              <ContentItem
                iconComponent={
                  <ContactSVG color={selectedKey === '6' ? SECONDARY : WHITE} />
                }
                text={'צור קשר'}
              />
            </Menu.Item>
          </React.Fragment>
        {activeUser?.role === PERMISSIONS.INSTRUCTION && (
          <Menu.Item
            style={selectedKey === '8' ? selectedStyled : unSelectedStyled}
            key="8"
            onSelect={handleSelect}
          >
            <ContentItem
              iconComponent={
                <WeeklyFeefbackSVG
                  color={selectedKey === '8' ? SECONDARY : WHITE}
                />
              }
              text={'נוכחות יומית'}
            />
          </Menu.Item>
        )}

        {activeUser?.role !== PERMISSIONS.PARENT && (
          <DividerWrapper>
            <Divider style={{ 'background-color': 'white' }} />
          </DividerWrapper>
        )}
        <Menu.Item
          style={selectedKey === '7' ? selectedStyled : unSelectedStyled}
          key="7"
          onSelect={handleSelect}
          onClick={() => handleLogout()}
        >
          <ContentItem
            iconComponent={
              <LogoutSVG color={selectedKey === '7' ? SECONDARY : WHITE} />
            }
            text={'התנתק'}
          />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(ECSidebar);

const DividerWrapper = styled.div`
  width: 100px;
  margin-right: 20px;
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  padding-right: 12px;
  font-size: 17px;
  &::after {
    right: 0;
  }
`;

const ItemGlobal = createGlobalStyle`
.ant-menu-rtl.ant-menu-inline .ant-menu-item::after{
  right:0;
}

`;

const IconWrapper = styled.div`
  padding-top: 10px;
`;
const selectedStyled = {
  backgroundColor: `${WHITE}`,
  color: `${SECONDARY}`,
  width: '90%',
  borderTopLeftRadius: 20,
  borderBottomLeftRadius: 20,
  fontWeight: 'bolder',
};

const unSelectedStyled = {
  color: `${WHITE}`,
};

const HeaderWrapper = styled.div`
  display: flex;
  padding: 20px 15px 0px 15px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameText = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  padding: 25px 15px 5px 15px;
`;

const RoleWrapper = styled.div`
  color: white;
  font-size: 1rem;
  padding: 15px 15px 10px 10px;
`;
