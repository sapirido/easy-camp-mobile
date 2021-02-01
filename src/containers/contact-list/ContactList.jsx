import React,{useState,useEffect} from 'react';
import {Col,Row} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../data/modules/employee/employee.action';
import { ContactStyled, ListStyled } from './Contact.styled';

export default function ContactList({}){

    const dispatch = useDispatch();
    const { employees } = useSelector(({employee}) => employee);

    useEffect(() => {
        dispatch(getEmployees())
    },[]);

    useEffect(()=>{
        console.log({employees});
    },[employees]);

    return(
        <ContactStyled>
            <ListStyled>
                Contact List
            </ListStyled>
        </ContactStyled>
    )
}