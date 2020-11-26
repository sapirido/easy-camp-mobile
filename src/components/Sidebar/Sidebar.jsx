
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
import {useSelector, batch,useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import { getAllCamps } from '../../data/modules/camp/camp.action';
import { getEmployees } from '../../data/modules/employee/employee.action';

const {  Sider } = Layout;
const { SubMenu } = Menu;

 function Sidebar({history}){
    const dispatch = useDispatch();
    const {activeUser} = useSelector(({auth}) => auth);
    const {camps} = useSelector(({camp})=>camp);
    const {employees} = useSelector(({employee}) => employee);
    const [collapsed,setCollapsed] = useState(false);

    function onCollapse(collapsed){
        setCollapsed(collapsed);
    }

useEffect(()=>{
batch(()=>{
  dispatch(getAllCamps());
   dispatch(getEmployees())
})
},[])

console.log({employees});
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
              {Object.keys(employees)?.map((employee,index) => <Menu.Item key={employee}>{employees[employee]?.name}</Menu.Item> )}
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="מחנות">
              {camps.map((camp,index) => <Menu.Item key={String(Number(camp.camp_id)+30 + index)}>{camp.camp_name}</Menu.Item>)}
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              טפסים
            </Menu.Item>
           {activeUser.isAdmin && <MenuItem onClick={()=>history.push('/admin')} key="10" icon={<EditOutlined />}>פאנל ניהולי</MenuItem>} 
          </Menu>
        </Sider>
    )
 }
      
          
export default withRouter(Sidebar);
