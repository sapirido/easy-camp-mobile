import { Checkbox, Form, Input } from 'antd';
import React from 'react';
import { EMPLOYEE_TYPE } from '../../common/constants';


export default function EditEmployeeData({data,editData}){
const [form] = Form.useForm();
    return(
        <Form
        form={form}
        layout={'vertical'}
        >
            <Form.Item label="שם מלא" required tooltip="שדה זה הינו חובה">
            <Input value={data?.name} defaultValue={data?.name} placeholder="הכנס שם מלא" onChange={(e)=>editData('name',e.target.value)}/>
        </Form.Item>
        <Form.Item label="תעודת זהות" required tooltip="שדה זה הינו חובה">
            <Input value={data?.id} placeholder="הכנס תעודת זהות" onChange={(e)=>editData('id',e.target.value)}/>
        </Form.Item>
        <Form.Item label="מספר טלפון" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.phone} placeholder="הכנס מספר טלפון" onChange={(e)=>editData('phone',e.target.value)}/>
        </Form.Item>
        <Form.Item label="אימייל" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.email} placeholder="הכנס מספר טלפון" onChange={(e)=>editData('email',e.target.value)}/>
        </Form.Item>
        {data?.type === EMPLOYEE_TYPE.INSTRUCTION && <Form.Item>
            <Checkbox checked={data?.leader} onChange={(e)=>editData('leader',e.target.checked)}>רכז הסעה ?</Checkbox>
        </Form.Item>}
        </Form>
    )
}