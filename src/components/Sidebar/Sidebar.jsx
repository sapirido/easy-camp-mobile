
import {
    DesktopOutlined,
    FileOutlined, PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    EditOutlined 
} from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';
import React, { useState,useEffect } from 'react';
import {useSelector, batch,useDispatch} from 'react-redux'
import {withRouter} from 'react-router'
import { getAllCamps } from '../../data/modules/camp/camp.action';
import { getEmployees, setSelectedEmployee } from '../../data/modules/employee/employee.action';
import { EMPLOYEE_TYPE, PERMISSIONS } from '../../common/constants';
import {SidebarHeaderStyled} from './Sidebar.styled';

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

function handleEmployeeClicked(employee){
  dispatch(setSelectedEmployee(employee));
  switch(employee.type){
    case EMPLOYEE_TYPE.CAMP_MANAGER:{
      history.push(`/employee/campManager/${employee.id}`)
      break;
    }
    case EMPLOYEE_TYPE.INSTRUCTION:
      history.push(`/employee/instruction/${employee.id}`);
      break;
    default:
      return null;
  }

}

function getActiveUserType(){
  switch(activeUser.type){
    case EMPLOYEE_TYPE.CAMP_MANAGER:
      return 'רכז מחנה';
    case EMPLOYEE_TYPE.INSTRUCTION && activeUser.leader:
      return 'רכז הסעה';
    case EMPLOYEE_TYPE.INSTRUCTION:
      return 'מדריך';
    default:
      return 'מנהל קייטנה'
    
  }
}

function getHeaderContnet(){
    return !collapsed ? (
      <>
      <div>
        {activeUser.displayName} - {getActiveUserType()}
      </div>
      <Avatar src={activeUser.photoURL}/>
      </>
    ) : (
      <Avatar src={activeUser.photoURL}/>
    )
}

    return(
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <SidebarHeaderStyled>
            {getHeaderContnet()}
          </SidebarHeaderStyled>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              סטטיסטיקות
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              משובים
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="רשימת עובדים">
              {camps?.map((camp,index)=>(
                <SubMenu key={index} title={`עובדים מחנה ${camp.camp_name}`}>
                  <Menu.Item key={camp?.camp_manager?.id} onClick={()=>handleEmployeeClicked(camp?.camp_manager)}>{camp?.camp_manager.name} (רכז)</Menu.Item>
                  {camp?.instructions?.map((instruction,index) =>(
                    <Menu.Item key={index} onClick={()=>handleEmployeeClicked(instruction)}>{instruction.name}</Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="מחנות">
              {camps.map((camp,index) => <Menu.Item key={String(Number(camp.camp_id)+30 + index)}>{camp.camp_name}</Menu.Item>)}
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              טפסים
            </Menu.Item>
           {PERMISSIONS[activeUser.type] === 5  && <Menu.Item onClick={()=>history.push('/admin')} key="10" icon={<EditOutlined />}>פאנל ניהולי</Menu.Item>} 
          </Menu>
        </Sider>
    )
 }
      
          
export default withRouter(Sidebar);
