import React, { useState, useEffect } from 'react';
import {Table} from 'antd';
import { useParams } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import { setSelectedCampByInstruction } from '../../data/modules/camp/camp.action';
import {setSelectedEmployeeById} from '../../data/modules/employee/employee.action';
import { HeaderStyled, MainText, DescriptionText } from '../../common/styles/common.styled';
import {ContactListStyled} from './ContactList.styled';

export default function ContactList({}){
    const dispatch = useDispatch();
    let { employeeId,transport } = useParams();
    const { selectedEmployee } = useSelector(({employee}) => employee);
    const { camps,selectedCamp } = useSelector(({camp}) => camp);    
    const [childrenList,setChildrenList] = useState([]);
    transport = transport === 'true' ? true : false;
    const columns =[
        {
            key:1,
            title:'שם משפחה',
            dataIndex:'familyName'
        },
        {
            key:2,
            title:'שם ההורה',
            dataIndex:'parentName'
        },
        {
            key:3,
            title:'שם הילד',
            dataIndex:'childrenName'
        },
        {
            key:4,
            title:'עולה לכיתה',
            dataIndex:'graduate'
        },
        {
            key:5,
            title:'טלפון',
            dataIndex:'phone'
        },
        {
            key:6,
            title:'שכונה',
            dataIndex:'neighborhood'
        },
        {
            key:7,
            title:'תחנת הסעה',
            dataIndex:'transport'
        },
        {
            key:8,
            title:'קוד לקוח',
            dataIndex:'customerCode'
        },
        {
            key:9,
            title:'תעודת זהות',
            dataIndex:'id'
        }
    ]
    useEffect(()=>{
        if(!selectedCamp){
            dispatch(setSelectedCampByInstruction(camps,employeeId))
        }
        if(!selectedEmployee){
            console.log('a');
            dispatch(setSelectedEmployeeById(employeeId));
        }
        let childrenList = [];
     if(transport && camps){
      for(let camp of camps){
          const groups = camp.groups;
          for(let group of groups){
              const childrens = group.childrens;
              for(let children of childrens){
                  console.log(selectedEmployee?.transports,selectedEmployee?.transports.includes(children.tranport));
                  if(selectedEmployee?.transports.includes(children.transport)){
                      childrenList.push(children);
                  }
              }
          }
      }
     }else{
        const selectedGroup = selectedCamp?.groups?.find(group => group.instruction.id === employeeId);
        childrenList = selectedGroup?.childrens;
     }
     setChildrenList(childrenList);
    },[selectedCamp,camps,selectedEmployee])

    function renderHeaderText(){
        let text = '';
        if(transport){
            text += 'אלפון הסעה - '
        }else{
            text+= 'אלפון קבוצה - '
        }
        if(selectedEmployee){
            text += selectedEmployee.name;
        }
        return text;
    }
    return(
        <ContactListStyled>
                <HeaderStyled>
                <MainText>{renderHeaderText()}</MainText>
           </HeaderStyled>
        <Table style={{width:'90%'}} columns={columns} dataSource={childrenList}/>
        </ContactListStyled>
    )
}