import React from 'react';
import { Card } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

const {Meta} = Card;
export default function DailyScheduleCard({daily,setSchuduleModal,setSelectedSchedule}){
       
    function showScheduleHendler(){
        setSelectedSchedule(daily);
        setSchuduleModal({type:'SHOW',isVisible:true,title:`לו״ז יומי, תאריך ${daily.date}`})
    }
    const actions = [
        <EditOutlined onClick={()=>console.log('edit clicked')} key="edit" />,
        <EyeOutlined onClick={()=>showScheduleHendler()} key="show" />

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