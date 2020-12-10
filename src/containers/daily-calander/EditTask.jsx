import React,{useState} from 'react';
import {EditTaskStyled} from './ScheduleTasks.styled';
import {Form,Input,TimePicker,Button} from 'antd';
import moment from 'moment';
const {RangePicker} = TimePicker;

export default function EditTask({task,setTask}){
    const [title,setTitle] = useState(task.title);
    const [description,setDescription] = useState(task.description);
    const [timeRange,setTimeRange] = useState(task.hourRange);
    function onEditTask(){
        setTask({title,description,timeRange,id:task.id});
    }

    function editTimeRang(time){
        const times = time.map(t => moment(t).format('HH:mm'));
        setTimeRange(times);
    }
    return(
        <EditTaskStyled>
                  <Input style={{marginBottom:15}} value={title} placeholder="שם הפעילות" onChange={(e)=>setTitle(e.target.value)} />
                  <Input.TextArea style={{marginBottom:15}}  value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="תיאור קצר לפעילות" maxLength={100} />
                  <RangePicker style={{marginBottom:15}} onChange={time => editTimeRang(time)} format={'HH:mm'} />
              <Button type="primary" onClick={()=>onEditTask()} block>
               ערוך פעילות
              </Button>
        </EditTaskStyled>
    )
}