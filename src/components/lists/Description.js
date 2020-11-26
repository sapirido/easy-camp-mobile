import React from 'react';
import { EMPLOYEE_TYPE } from '../../common/constants';
import { Descriptions } from 'antd';

export default function Description({item,type}){

    switch(type){
        case EMPLOYEE_TYPE.CAMP_MANAGER:
            return(
                <Descriptions title="" layout="vertical">
                <Descriptions.Item label="שם הרכז">{item.name}</Descriptions.Item>
                <Descriptions.Item label="תעודת זהות">{item.id}</Descriptions.Item>
                <Descriptions.Item label="טלפון">{item.phone}</Descriptions.Item>
                <Descriptions.Item label="אימייל">{item.email}</Descriptions.Item>
              </Descriptions>
            )
        case EMPLOYEE_TYPE.INSTRUCTION:
            return(
                <Descriptions title="" layout="vertical">
                <Descriptions.Item label="שם המדריך">{item.name}</Descriptions.Item>
                <Descriptions.Item label="תעודת זהות">{item.id}</Descriptions.Item>
                <Descriptions.Item label="טלפון">{item.phone}</Descriptions.Item>
                <Descriptions.Item label="אימייל">{item.email}</Descriptions.Item>
              </Descriptions>
            )
        default:
            return(
             <Descriptions title="" layout="vertical">
                <Descriptions.Item label="שם החניך">{item.childrenName} {item.familyName}</Descriptions.Item>
                <Descriptions.Item label="תעודת זהות">{item.id}</Descriptions.Item>
                <Descriptions.Item label="טלפון">{item.phone}</Descriptions.Item>
                <Descriptions.Item label="קוד לקוח">{item.customerCode}</Descriptions.Item>
                <Descriptions.Item label="מס תחנה">{item.transport}</Descriptions.Item>
                <Descriptions.Item label="שם ההורה">{item.parentName}</Descriptions.Item>
                <Descriptions.Item label="עולה לכיתה">{item.graduate}</Descriptions.Item>
                <Descriptions.Item label="שם המדריך">{item.instruction_name}</Descriptions.Item>
              </Descriptions>
            )
    }

}