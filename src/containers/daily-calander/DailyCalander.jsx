import React, { useState } from 'react';
import { Button, Form, Input, Modal, Space, TimePicker,DatePicker } from 'antd';
import { PlusCircleTwoTone, PlusOutlined,MinusCircleOutlined} from '@ant-design/icons';
import { HeaderStyled, MainText } from '../../common/styles/common.styled';
import { CreateContentSyled, CreationStyled, DailyCalanderStyled,GeneralInfoStyled } from './DailyCalander.styled';
import moment from 'moment';
import { useDispatch, useSelector, batch } from 'react-redux';
import {addDailySchedule} from '../../data/modules/schedule/schedule.action';
const {RangePicker} = TimePicker;
export default function DailyCalander({}){
    const dispatch = useDispatch();
    const [isVisible,setIsVisible] = useState(false);
    const [selectedDate,setSelectedDate] = useState(null);
    const [tasks,setTasks] = useState([]);
    const [disabled,setDisabled] = useState(true);
    const {allDays}  = useSelector(({schedule}) => schedule)
    function createCalanderHandler(){
        console.log({selectedDate,tasks});
        const dailySchedule = {
            date:selectedDate,
            tasks
        }
        dispatch(addDailySchedule(dailySchedule))
        batch(()=>{
            setSelectedDate(null);
            setTasks([]);
            setIsVisible(false);
        })
    }

function onFinish(values){
let {tasks} = values;
tasks = tasks.map(task =>({
   title:task.title,
   description:task.description,
   timeRange:task.hourRange.map(time => moment(time).format('HH:mm')) 
}));
setTasks(tasks);
setDisabled(false);
}
function onDateSelected(date,dateString){
    setSelectedDate(dateString);
}

console.log({allDays});
    function renderCreateCalander(){
        return(
            <CreateContentSyled>
                <GeneralInfoStyled>
                <DatePicker placeholder="בחר תאריך" onChange={onDateSelected} />
                </GeneralInfoStyled>
                 <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="tasks">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                    {...field}
                  name={[field.name, 'title']}
                  fieldKey={[field.fieldKey, 'title']}
                  rules={[{ required: true, message: 'חסר שם לפעילות' }]}
                >
                  <Input placeholder="שם הפעילות" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'description']}
                  fieldKey={[field.fieldKey, 'description']}
                  rules={[{ required: false }]}
                >
                  <Input style={{width:350}} placeholder="תיאור קצר לפעילות" maxLength={100} />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'hourRange']}
                  fieldKey={[field.fieldKey, 'hourRange']}
                  rules={[{ required: true, message: 'יש להזין שעות פעילות' }]}
                >
                  <RangePicker  format={'HH:mm'} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
               הוסף פעילות
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          אשר פעילויות
        </Button>
      </Form.Item>
    </Form>
</CreateContentSyled>
        )
    }
    return(
     <DailyCalanderStyled>
         <Modal
         title={'יצירת ל״וז יומי חדש'}
         visible={isVisible}
         onOk={createCalanderHandler}
         onCancel={()=>setIsVisible(false)}
         okText={'צור ל״וז'}
         okButtonProps={{disabled}}
         cancelText={'ביטול'}
         width={850}
         cancelButtonProps={{type:'ghost'}}
         >
             {renderCreateCalander()}
         </Modal>
         <HeaderStyled>
                <MainText>בניית לו״ז יומי</MainText>
         </HeaderStyled>
         <CreationStyled>
         <PlusCircleTwoTone  className='plus' onClick={()=>setIsVisible(true)} twoToneColor={'rgb(31 169 200 / 85%)'}>הוסף לוז יומי חדש</PlusCircleTwoTone>
         </CreationStyled>
     </DailyCalanderStyled>
    )
}