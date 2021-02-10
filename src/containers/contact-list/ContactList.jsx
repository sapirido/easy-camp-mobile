import React,{useState,useEffect} from 'react';
import {Col,Row} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../data/modules/employee/employee.action';
import { ContactStyled, ListStyled,SearchContainer } from './Contact.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import { SECONDARY } from '../../common/styles/colors';
import ContactListItem from './ContactItem';
import {Input} from 'antd';

const {Search} = Input;

export default function ContactList({}){

    const dispatch = useDispatch();
    const { employees } = useSelector(({employee}) => employee);
    const [employeesArray,setEmployee] = useState([]);

    useEffect(() => {
        dispatch(getEmployees())
    },[]);

    useEffect(() => {
       if(!employeesArray.length){
           setEmployee(Object.values(employees));
       }
    },[employees]);

    function searchHandler(value){
        if(value === ''){
            setEmployee(Object.values(employees));
            return;
        }
        const filteredEmployees = Object.values(employees).filter(employee => employee.name.startsWith(value))
        setEmployee(filteredEmployees);
    }

    function getSortedEmployee(){
        if(!employeesArray?.length) return [];
        console.log({employeesArray});
        const sortedArray = employeesArray.sort((a,b) => b.role - a.role);
        console.log({sortedArray})
        return sortedArray;
    }
    return(
        <ContactStyled>
        <HeaderPage  title={'- צור קשר -'} size={1.6} color={SECONDARY}/>
        <SearchContainer>
            <Search onChange={e => searchHandler(e.target.value)} placeholder={'חיפוש'} onSearch={searchHandler} style={{width:'100%',minWidth:'100%'}}/>
        </SearchContainer>
            <ListStyled>
            {getSortedEmployee().map(({type,phone,name},index) => (
                <ContactListItem type={type} phone={phone} name={name} key={index}/>
            ))}
            </ListStyled>
        </ContactStyled>
    )
}