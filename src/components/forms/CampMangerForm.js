import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React from 'react';
import { FormStyled,FormHeaderStyled,Text } from '../../common/styles/common.styled';

export default function CampMangerForm({checkValidation,managerName,setManagerName,managerId,setManagerId,managerEmail,setManagerEmail,managerPhone,setManagerPhone}){
const [form] = Form.useForm();
    return(
    <FormStyled>
        <FormHeaderStyled>
                <Text>פרטי רכז המחנה</Text>
            </FormHeaderStyled>
       <Form
       form={form}
       layout={'vertical'}
       >
        <Form.Item label="שם מלא" required tooltip="שדה זה הינו חובה">
            <Input value={managerName} placeholder="הכנס שם מלא" onChange={(e)=>setManagerName(e.target.value)}/>
        </Form.Item>
        <Form.Item label="תעודת זהות" required tooltip="שדה זה הינו חובה">
            <Input value={managerId} placeholder="הכנס תעודת זהות" onChange={(e)=>setManagerId(e.target.value)}/>
        </Form.Item>
        <Form.Item label="מספר טלפון" required tooltip={{title:'שדה זה הינו חובה',icon:<InfoCircleOutlined/>}}>
            <Input value={managerPhone} label="הכנס מספר טלפון" onChange={(e)=>setManagerPhone(e.target.value)}/>
        </Form.Item>
        <Form.Item label="אימייל" required tooltip={{title:'שדה זה הינו חובה',icon:<InfoCircleOutlined/>}}>
            <Input value={managerEmail} label="הכנס מספר טלפון" onChange={(e)=>setManagerEmail(e.target.value)}/>
        </Form.Item>
       </Form>
       <Button onClick={checkValidation} type='primary'>אשר נתונים</Button>
       </FormStyled>
    )
}