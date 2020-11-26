import React from 'react';
import {Form,Input} from 'antd';

export default function EditChildren({data,editData}){
    const [form] = Form.useForm();
    return(
        <Form
        form={form}
        layout={'vertical'}
        >
            <Form.Item label="שם פרטי" required tooltip="שדה זה הינו חובה">
            <Input value={data?.childrenName}  placeholder="הכנס שם מלא" onChange={(e)=>editData('childrenName',e.target.value)}/>
        </Form.Item>
        <Form.Item label="שם משפחה" required tooltip="שדה זה הינו חובה">
            <Input value={data?.familyName} placeholder="הכנס תעודת זהות" onChange={(e)=>editData('familyName',e.target.value)}/>
        </Form.Item>
        <Form.Item label="תעודת זהות" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.id} placeholder="הכנס תעודת זהות" onChange={(e)=>editData('id',e.target.value)}/>
        </Form.Item>
        <Form.Item label="מספר טלפון" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.phone} placeholder="הכנס מספר טלפון" onChange={(e)=>editData('phone',e.target.value)}/>
        </Form.Item>
        <Form.Item label="שם ההורה" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.parentName} placeholder="הכנס את שם ההורה" onChange={(e)=>editData('parentName',e.target.value)}/>
        </Form.Item>
        <Form.Item label="שכונה" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.neighborhood} placeholder="הכנס את שם השכונה" onChange={(e)=>editData('neighborhood',e.target.value)}/>
        </Form.Item>
        <Form.Item label="מספר הסעה" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.transport} placeholder="הכנס מספר תחנה" onChange={(e)=>editData('transport',e.target.value)}/>
        </Form.Item>
        <Form.Item label="עולה לכיתה" required tooltip={{title:'שדה זה הינו חובה'}}>
            <Input value={data?.graduate} placeholder="עולה לכיתה ?" onChange={(e)=>editData('graduate',e.target.value)}/>
        </Form.Item>
        </Form>
    )
}