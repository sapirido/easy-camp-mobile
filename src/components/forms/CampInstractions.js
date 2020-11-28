import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { TRANSPORTS } from '../../common/constants';
import { FormHeaderStyled, Text } from '../../common/styles/common.styled';
import { CampImstractionStyled } from '../../containers/camps/create/CreateCamp.styled';


const {Option} = Select;

export default function CampInstractions({setInstructions}){

    const [leader,setLeader] = useState(null);
    const [transports,setTransports] = useState(TRANSPORTS);
    const [selectedTransport,setSelectedTransport] = useState([])

    const onFinish = values => {
      let { instructions } = values;
      console.log({instructions});
      if(leader.checked){
        instructions[leader.key].leader = true;
        instructions[leader.key].transports = selectedTransport;
      }
      instructions = instructions.map(instruction=>({
        ...instruction,
        leader:!!instruction.leader,
        type:'INSTRUCTION'
      }))
      setInstructions(instructions);
  };

  function onLeaderSelected(e,field){
      if(e.target.checked){
          setLeader({checked:true,key:field.key});
      }
      if(!e.target.checked && field.key === leader){
        setLeader(null);
      }
  }
  function handleTranspotSelected(value){
    console.log({value});
    setSelectedTransport(value);
  }
  console.log({selectedTransport});
  return (
      <CampImstractionStyled style={{height:'100%'}}>
        
        <FormHeaderStyled>
                <Text>פרטי מדריכי המחנה</Text>
            </FormHeaderStyled>
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="instructions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'name']}
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[{ required: true, message: 'חסר שם מלא' }]}
                >
                  <Input placeholder="שם מלא" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'id']}
                  fieldKey={[field.fieldKey, 'id']}
                  rules={[{ required: true, message: 'חסר תעודת זהות' }]}
                >
                  <Input placeholder="תעודת זהות" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'phone']}
                  fieldKey={[field.fieldKey, 'phone']}
                  rules={[{ required: true, message: 'חסר מספר טלפון' }]}
                >
                  <Input placeholder="מספר טלפון" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'email']}
                  fieldKey={[field.fieldKey, 'email']}
                  rules={[{ required: true, message: 'חסר אימייל' }]}
                >
                  <Input placeholder="אימייל" />
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'leader']}
                  fieldKey={[field.fieldKey, 'leader']}
                  rules={[{ required: false}]}
                >
                 <Checkbox onChange={(e)=>onLeaderSelected(e,field)}>רכז הסעה?</Checkbox>
                </Form.Item>
                {leader &&(
                  <Form.Item>
                    <Select
                    mode="multiple"
                    allowClear
                    style={{width:300}}
                    onChange={handleTranspotSelected}
                    placeholder="אנא בחר את מספרי ההסעות שבאחריות המדריך"
                    >
                      {transports.map(transport => <Option key={transport}>{transport}</Option>)}
                    </Select>
                  </Form.Item>
                )}
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
               הוסף מדריך
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          אשר מדריכים
        </Button>
      </Form.Item>
    </Form>
    </CampImstractionStyled>
  );
};