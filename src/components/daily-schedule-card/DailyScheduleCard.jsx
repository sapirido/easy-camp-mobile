import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const {Meta} = Card;
export default function DailyScheduleCard({daily,setSchuduleModal,setSelectedSchedule,deleteSchedule}){
       
    function showScheduleHendler(){
        setSelectedSchedule(daily);
        setSchuduleModal({type:'SHOW',isVisible:true,title:`לו״ז יומי, תאריך ${daily.date}`})
    }
    const actions = [
        <DeleteOutlined style={{color:'red'}} onClick={()=>deleteSchedule(daily)} key="delete" />,
        <EditOutlined onClick={()=>showScheduleHendler()} key="edit" />

    ]
    console.log({daily});
    return(
        <Card
        className={'action-card'}
        style={{width:220,boxShadow:'5px 5px 10px'}}
        actions={actions}>
            <Meta
            title={<span style={{textAlign:'center'}}>{daily?.date}</span>}/>
        </Card>
    )
}