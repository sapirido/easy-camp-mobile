import React,{useEffect} from 'react';
import {InstructionPageContainer,EmployeeDetails,ActionsSytyled} from './Instruction.styled';
import {useSelector,useDispatch} from 'react-redux';
import { MainText, DescriptionText, HeaderStyled } from '../../../common/styles/common.styled';
import { useParams } from 'react-router';
import {setSelectedEmployeeById} from '../../../data/modules/employee/employee.action';
import DetailsList from '../../../components/lists/DetailsList';
import { EditOutlined, EyeOutlined,PlusOutlined } from '@ant-design/icons';
import ActionCard from '../../../components/ActionCard/ActionCard';
import { PERMISSIONS } from '../../../common/constants';

const instructionAvatar = require('../../../assets/images/instruction.png');

export default function InstructionPage({history}){
const {selectedEmployee} = useSelector(({employee}) => employee);
const { activeUser } = useSelector(({auth}) => auth);
const { instructionId } = useParams();
const dispatch = useDispatch();
useEffect(() => {
    if(selectedEmployee?.id !== instructionId){
        dispatch(setSelectedEmployeeById(instructionId));
    }
}, [])

const contactListProps = {
    activeUser,
    title:'אלפון קבוצה',
    description:"ריכוז כלל הטלפונים של כל ילדי הקבוצה",
    actions:[    
    <EyeOutlined  onClick={()=>console.log('ellipsis')} key="view" />]
}

const hourReportProps = {
    activeUser,
    title:'שעות עבודה',
    description:'הזנת שעות עבודה, אשר ישלחו ויאושרו ע״י רכז המחנה',
    actions:[
        <PlusOutlined onClick={()=>console.log('add')} key="add"/>,
        <EditOutlined onClick={() => console.log('Edit')} key="edit"/>
    ]
}

const parentsConversionProps ={
    activeUser,
    title:'דו״ח שיחות הורים',
    description:'הזנת שיחות עם ההורים, יש להזין לאחר כל שיחה',
    actions:[
        <EditOutlined onClick={() => console.log('Edit')} key="edit"/>,
        <PlusOutlined onClick={()=>console.log('add')} key="add"/>
    ]
} 
const contactTransportList = {
    activeUser,
    title:'אלפון הסעה',
    description:"ריכוז כלל הטלפונים של כל ילדי ההסעה",
    actions:[    
    <EyeOutlined  onClick={()=>console.log('ellipsis')} key="view" />]
}
    return(
        <InstructionPageContainer>
             <HeaderStyled>
                <MainText>דף מדריך - {selectedEmployee?.name} </MainText>
               <DescriptionText>מנהל יקר שים לב! כל שינוי מעדכן את מנהל המערכת ואת המידע באפליקציה</DescriptionText>
           </HeaderStyled>
           <EmployeeDetails>
              {selectedEmployee && <DetailsList list={[selectedEmployee]} avatar={instructionAvatar} isEmployeePage/>} 
           </EmployeeDetails>
           <ActionsSytyled>
                <ActionCard {...contactListProps}/>
                <ActionCard {...hourReportProps}/>
                <ActionCard {...parentsConversionProps}/>
                {PERMISSIONS[activeUser?.type] >= 2 &&  selectedEmployee?.leader && <ActionCard {...contactTransportList}/>}
           </ActionsSytyled>
        </InstructionPageContainer>
    )
}