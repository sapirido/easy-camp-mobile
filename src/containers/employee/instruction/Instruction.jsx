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
import {setSelectedCampByInstruction} from '../../../data/modules/camp/camp.action';

const instructionAvatar = require('../../../assets/images/instruction.png');

export default function InstructionPage({history}){
const {camps} = useSelector(({camp}) => camp);
const {selectedEmployee} = useSelector(({employee}) => employee);
const { activeUser } = useSelector(({auth}) => auth);
const { instructionId } = useParams();
const dispatch = useDispatch();
useEffect(() => {
    if(selectedEmployee?.id !== instructionId){
        dispatch(setSelectedEmployeeById(instructionId));
    }
    dispatch(setSelectedCampByInstruction(camps,instructionId))
}, [camps])

const actions = [
    {
        key:1,
        activeUser,
        title:'אלפון קבוצה',
        description:"ריכוז כלל הטלפונים של כל ילדי הקבוצה",
        actions:[    
        <EyeOutlined  onClick={()=>history.push(`/employee/instruction/contactList/${selectedEmployee.id}/group`)} key="view" />]
    },
    {
        key:2,
        activeUser,
        title:'שעות עבודה',
        description:'הזנת שעות עבודה, אשר ישלחו ויאושרו ע״י רכז המחנה',
        actions:[
            <PlusOutlined onClick={()=>console.log('add')} key="add"/>,
            <EditOutlined onClick={() => console.log('Edit')} key="edit"/>
        ]
    },
    {
        key:3,
        activeUser,
        title:'דו״ח שיחות הורים',
        description:'הזנת שיחות עם ההורים, יש להזין לאחר כל שיחה',
        actions:[
            <EyeOutlined  onClick={()=>history.push(`/employee/instruction/${selectedEmployee.id}/parent_report`)} key="view" />
        ]
    },
    {
        key:4,
        activeUser,
        title:'אלפון הסעה',
        description:"ריכוז כלל הטלפונים של כל ילדי ההסעה",
        actions:[    
        <EyeOutlined  onClick={() => history.push(`/employee/instruction/contactList/${selectedEmployee?.id}/transport`)} key="view" />]
    }
    
]
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
                {actions.map(action=>{
                    if(action.key === 4){
                        return PERMISSIONS[activeUser.type] >=2 && selectedEmployee?.leader ? <ActionCard {...action}/> : null;
                    }else{
                        return <ActionCard {...action}/>
                    }

                })}
           </ActionsSytyled>
        </InstructionPageContainer>
    )
}