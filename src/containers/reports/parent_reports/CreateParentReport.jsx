import React from 'react';
import { FormStyled, FormHeaderStyled, Text } from '../../../common/styles/common.styled';
import { Form,DatePicker,Input,Button } from 'antd';
import moment from 'moment';
const {TextArea} = Input;
export default function CreateParentReport({onCreate}){
    const [form] = Form.useForm();

    function handleFinish(values){
        console.log({values})
        const newDate = moment(values.date).format('DD-MM-YY')
        console.log({newDate})
        const report = {
            ...values,
            date:newDate
        }
        onCreate(report);
    }
    return(
        <>
        <FormHeaderStyled>
            <Text>פרטי הדו״ח</Text>
        </FormHeaderStyled>
    <Form
    form={form}
    layout={'vertical'}
    onFinish={handleFinish}
    >
    <Form.Item
        label="תאריך השיחה"
        name="date"
        rules={[{ required: true, message: 'אנא הכנס תאריך שיחה' }]}>
         <DatePicker placeholder="בחר תאריך" />
     </Form.Item>
     <Form.Item
    label="שם ההורה"
     name="parentName"
     rules={[{ required: true, message: 'אנא הכנס את שם ההורה' }]}>
         <Input />
     </Form.Item>
     <Form.Item
        label="שם הילד"
        name="childrenName"
        rules={[{ required: true, message: 'אנא הכנס את שם הילד' }]}>
         <Input />
     </Form.Item>
     <Form.Item
        label="מהות השיחה"
        name="description"
        rules={[{ required: true, message: 'אנא הכנס את מהות השיחה' }]}>
         <TextArea showCount />
     </Form.Item>
     <Form.Item>
    <Button type="primary" htmlType="submit">אשר דו״ח</Button> 
    </Form.Item>
    </Form>
    </>
    )
}