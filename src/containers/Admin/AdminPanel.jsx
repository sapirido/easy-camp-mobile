import { EditOutlined, EyeOutlined,PlusOutlined } from '@ant-design/icons';
import React from 'react';
import ActionCard from '../../components/ActionCard/ActionCard';
import { ActionsContainer, AdminPanelStyled } from './AdminPanel.styled';
import {HeaderStyled, MainText, DescriptionText} from '../../common/styles/common.styled';
import { useSelector } from 'react-redux';


export default function AdminPanel({history}){

    const {activeUser}  = useSelector(({auth})=>auth);
    const usersPermissionsCardProps = {
        activeUser,
        title:'חלוקה למחנות',
        description:'בכרטיסיה זו תוכל לעדכן את משתתפי הקייטנה לפי מחנות וקבוצות',
        actions:[
        <EditOutlined onClick={()=>history.push('/admin/camps/edit')} key="edit" />,
        <PlusOutlined onClick={()=>history.push('/admin/camps/create')} key="create" />,
    ]
    }

    const calanderCardProps = {
        activeUser,
        title:'לו״ז כללי',
        description:"תכנון לו״ז ותוכנית כללית של הקייטנה ועדכון בזמן אמת",
        actions:[    
        <EditOutlined onClick={()=>console.log('edit')} key="edit" />,
        <EyeOutlined  onClick={()=>console.log('ellipsis')} key="view" />]
    }

    return(
       <AdminPanelStyled>
           <HeaderStyled>
               <MainText>פאנל ניהול</MainText>
               <DescriptionText>מנהל יקר שים לב! כל שינוי שתבצע יתעדכן ישירות בכל המערכת</DescriptionText>
           </HeaderStyled>
        <ActionsContainer>
          <ActionCard {...usersPermissionsCardProps}/>
          <ActionCard {...calanderCardProps}/>
          </ActionsContainer>


       </AdminPanelStyled>
    )
}