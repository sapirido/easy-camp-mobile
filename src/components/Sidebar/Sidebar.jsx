
import {
    DesktopOutlined,
    FileOutlined, PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    EditOutlined 
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState,useEffect } from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';
import {useSelector} from 'react-redux'

const {  Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar(){
    const activeUser = useSelector(({auth}) => auth.activeUser);
    const [collapsed,setCollapsed] = useState(true);
    function onCollapse(collapsed){
        setCollapsed(collapsed);
    }
    console.log({thisIsActive:activeUser})
    return(
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              סטטיסטיקות
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              משובים
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="רשימת עובדים">
              <Menu.Item key="3">ספיר</Menu.Item>
              <Menu.Item key="4">אלירן</Menu.Item>
              <Menu.Item key="5">אופיר</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="מחנות">
              <Menu.Item key="6">מחנה א׳</Menu.Item>
              <Menu.Item key="8">מחנה ב׳</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              טפסים
            </Menu.Item>
           {activeUser.isAdmin && <MenuItem key="10" icon={<EditOutlined />}>פאנל ניהולי</MenuItem>} 
          </Menu>
        </Sider>
    )
}