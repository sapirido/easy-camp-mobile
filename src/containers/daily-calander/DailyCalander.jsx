import React, { useState,useEffect } from 'react';
import { Button, Form, Input, Modal, Space, TimePicker,DatePicker } from 'antd';
import { PlusCircleTwoTone, PlusOutlined,MinusCircleOutlined} from '@ant-design/icons';
import { HeaderStyled, MainText } from '../../common/styles/common.styled';
import { CreateContentSyled, CreationStyled, DailyCalanderStyled,GeneralInfoStyled,CardsStyled } from './DailyCalander.styled';
import moment from 'moment';
import { useDispatch, useSelector, batch } from 'react-redux';
import {addDailySchedule, getAllSchedules,editTaskByDate,deletedTask} from '../../data/modules/schedule/schedule.action';
import DailyScheduleCard from '../../components/daily-schedule-card/DailyScheduleCard';
import ScheduleTasks from './ScheduleTasks';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
const {RangePicker} = TimePicker;
export default function DailyCalander({}){
    const dispatch = useDispatch();
    const [isVisible,setIsVisible] = useState(false);
    const [selectedDate,setSelectedDate] = useState(null);
    const [tasks,setTasks] = useState([]);
    const [disabled,setDisabled] = useState(true);
    const [selectedSchedule,setSelectedSchedule] = useState(null);
    const [scheduleModal,setSchuduleModal] = useState({});
    const [selectedTask,setSelectedTask] = useState(null);
    const {allDays}  = useSelector(({schedule}) => schedule)

  useEffect(() => {
    dispatch(getAllSchedules());
  }, [])

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
tasks = tasks.map((task,index) =>({
   id:index+1,
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

console.log(allDays);
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

    function editTask(task){
      console.log({selectedSchedule,task});
      setSelectedTask(task);
      setSchuduleModal({type:'EDIT_TASK',isVisible:true,title:'עריכת פעילות'});
    }

    function setTask(newTask){
      closeModal();
      dispatch(editTaskByDate(selectedSchedule,newTask));
    }
    function deleteTask(task){
      setSelectedTask(task);
      setSchuduleModal({type:'DELETE_TASK',title:'מחיקת פעילות',isVisible:true});
    }

    function closeModal(){
      setSchuduleModal({});
    }

    function handleDeleteTask(){
      dispatch(deletedTask(selectedSchedule,selectedTask));
      closeModal();
    }
    function renderScheduleContent(){
      switch(scheduleModal.type){
        case 'SHOW':
          return <ScheduleTasks deleteTask={deleteTask} editTask={editTask} tasks={selectedSchedule.tasks}/>
        case 'EDIT_TASK':
          return <EditTask task={selectedTask} setTask={setTask}/>
        case 'DELETE_TASK':
          return <DeleteTask task={selectedTask} closeModal={closeModal} deleteTask={handleDeleteTask}/>
        default:
          return null;
      }


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
         <Modal
         title={scheduleModal.title}
         visible={scheduleModal.isVisible}
         onCancel={()=>{
           setSchuduleModal({});
           setSelectedSchedule(null)
          }}
         footer={null}
         width={500}
         >
           {renderScheduleContent()}
         </Modal>
         <HeaderStyled>
                <MainText>בניית לו״ז יומי</MainText>
         </HeaderStyled>
         <CreationStyled>
         <PlusCircleTwoTone  className='plus' onClick={()=>setIsVisible(true)} twoToneColor={'rgb(31 169 200 / 85%)'}>הוסף לוז יומי חדש</PlusCircleTwoTone>
         </CreationStyled>
         <CardsStyled>
         {Object.keys(allDays).length > 0 && Object.keys(allDays).map((day,key) =><DailyScheduleCard setSchuduleModal={setSchuduleModal} setSelectedSchedule={setSelectedSchedule} key={key} daily={allDays[day]}/>)}
         </CardsStyled>
     </DailyCalanderStyled>
    )
}