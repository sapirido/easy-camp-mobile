import React,{useState} from 'react';
import {CreateStyled} from './PointReport.styled';
import { GeneralInfoStyled } from '../../daily-calander/DailyCalander.styled';
import { DatePicker, Input,Form, Radio,Space,Button,InputNumber} from 'antd';
import { PlusOutlined,MinusCircleOutlined } from '@ant-design/icons';

export default function CreateReportPoints({onCreate}){
    const [source,setSource] = useState('');
    const [dest,setDestination] = useState('');
    const [date,setDate] = useState('');

    function onFinish(values){
        console.log({values})
        const report = {
            date,
            source,
            dest,
            points:values.points
        }
        onCreate(report);
    }
    return(
        <CreateStyled>
                <GeneralInfoStyled>
                <DatePicker style={{width:300}} placeholder="בחר תאריך" onChange={(date,dateString)=>setDate(dateString)} />
                <Input placeholder={'הכנס יעד'} onChange={e => setDestination(e.target.value)}/>
                <Input placeholder={'הכנס מוצא'} onChange={e  => setSource(e.target.value)}/>
                </GeneralInfoStyled>
                <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="points">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                 <Form.Item
                    {...field}
                    name={[field.name, 'order']}
                    fieldKey={[field.fieldKey, 'order']}
                    rules={[{ required: true, message: 'חסר מספר תחנת דיווח' }]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                <Form.Item
                    {...field}
                  name={[field.name, 'location']}
                  fieldKey={[field.fieldKey, 'title']}
                  rules={[{ required: true, message: 'חסר את שם המחלף' }]}
                >
                  <Input placeholder="הכנס את שם המחלף" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'type']}
                  fieldKey={[field.fieldKey, 'type']}
                  rules={[{ required: true,message:'הכנס את כיוון הנסיעה' }]}
                >
                  <Radio.Group>
                      <Radio value="to_dest">הלוך</Radio>
                      <Radio value="to_src">חזור</Radio>
                  </Radio.Group>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
             הוסף דיווח חדש
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
         אשר דיווחים
        </Button>
      </Form.Item>
    </Form>
        </CreateStyled>
    )

}