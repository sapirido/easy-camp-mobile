import React from 'react';
import { Form, Input,Button } from 'antd';
import { FormStyled,FormHeaderStyled,Text } from '../../common/styles/common.styled';



export default function CampGeneralInfo({campName,setCampName,campNumber,setCampNumber,checkValidation}){
    const [form] = Form.useForm();

    return(
        <FormStyled>
            <FormHeaderStyled>
                <Text>פרטי המחנה</Text>
            </FormHeaderStyled>
        <Form
        form={form}
        layout={'vertical'}
        >
         <Form.Item label="שם המחנה" required tooltip="שדה זה הינו חובה">
             <Input value={campName} placeholder="הכנס שם מלא" onChange={(e)=>setCampName(e.target.value)}/>
         </Form.Item>
         <Form.Item label="מספר המחנה" required tooltip="שדה זה הינו חובה">
             <Input value={campNumber} placeholder="הכנס שם מלא" onChange={(e)=>setCampNumber(e.target.value)}/>
         </Form.Item>
        </Form>
        <Button onClick={checkValidation} type="primary">אשר פרטים</Button> 
        </FormStyled>
    )
}