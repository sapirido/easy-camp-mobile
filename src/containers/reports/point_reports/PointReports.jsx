import React, { useState, useEffect } from 'react';
import { PlusCircleTwoTone,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Modal, Table, Tag } from 'antd';
import { HeaderStyled, MainText } from '../../../common/styles/common.styled';
import { CreateText, CreationStyled } from '../../daily-calander/DailyCalander.styled';
import { ReportPointStyled,ReportTableStyled} from './PointReport.styled';
import CreateReportPoints from './CreateReportsPoint';
import {addNewReport, getReportPoints,removeReportPoint} from '../../../data/modules/report/report.action'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import PointPreview from './PointsPreview';
export default function ReportPoints({}){
    const dispatch = useDispatch();
    const [modalObject,setModalObject] = useState({});
    const [data,setData] = useState([]);
    const {reportPoints} = useSelector(({report}) => report);

    useEffect(async()=>{
        await dispatch(getReportPoints());
        console.log({reportPoints})
    },[])

     function createHandler(report){
         console.log({report})
         dispatch(addNewReport(report));
         setModalObject({});
    }
    function renderModalContent(){
        switch(modalObject.type){
            case 'CREATE':
                return <CreateReportPoints onCreate={createHandler}/>
            default:
                return null;
        }
    }
    function onDeletePoint(date){
        dispatch(removeReportPoint(date));
    }

    const columns=[
        {
            title:'תאריך',
            dataIndex:'date',
            key:'date'
        },
        {
            title:'מוצא',
            dataIndex:'source',
            key:'source'
        },
        {
            title:'יעד',
            dataIndex:'dest',
            key:'dest'
        },
        {
            title:'סטטוס',
            key:'status',
            dataIndex:'date',
            render:date =>{
                return moment(date).format('X') < +new Date() ? <Tag color={'red'}>לא בוצע</Tag> : <Tag color={'green'}>בוצע</Tag>
            }
        },
        {
            title:'פעולות',
            key:'action',
            render:(text,record) => (
                <DeleteOutlined style={{color:'red'}} onClick={()=>onDeletePoint(record.date)}/>
            )
        }
    ]

    const dataToRender = Object.values(reportPoints ? reportPoints : {}).map((report,index) =>({
        ...report,
        key:index
    }))

    return( 
        <ReportPointStyled>
                <Modal
         title={modalObject.title}
         visible={modalObject.isVisble}
         footer={null}
         width={modalObject.size}
         onCancel={()=>setModalObject({})}
         >
             {renderModalContent()}
         </Modal>
            <HeaderStyled>
                <MainText>נקודות דיווח בדרכים</MainText>
            </HeaderStyled>
            <CreateText>הוסף דיווח נקודות חדש</CreateText>
         <CreationStyled>
         <PlusCircleTwoTone  className='plus' onClick={()=>setModalObject({isVisble:true,title:'יצירת נקודות דיווח',type:'CREATE',size:750})} twoToneColor={'rgb(31 169 200 / 85%)'}/>
         </CreationStyled>
         <ReportTableStyled>
             <Table
              columns={columns}
              dataSource={dataToRender}
              expandable={{
                expandedRowRender: record => <PointPreview report={record}/>,
                rowExpandable: record => !!record,
              }}/>
         </ReportTableStyled>
        </ReportPointStyled>
    )
}