import React, { useState } from 'react';
import {ParentReportStyled} from './ParentReport.styled';
import { HeaderStyled, MainText } from '../../../common/styles/common.styled';
import { CreationStyled, CreateText } from '../../daily-calander/DailyCalander.styled';
import { PlusCircleTwoTone,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import {Modal} from 'antd';
import CreateParentReport from './CreateParentReport';
import {addNewParentReport} from '../../../data/modules/report/report.action';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';


export default function ParentReports({}){

    const [modalObject,setModalObject] = useState({});
    const { instructionId } = useParams();
    const dispatch = useDispatch();
    function createReportHandler(report){
        setModalObject({});
        dispatch(addNewParentReport(instructionId,report))

    }

    function renderModalContent(){
        switch(modalObject.type){
            case 'CREATE':
              return <CreateParentReport onCreate={createReportHandler}/>
        }
    }
    return(
        <ParentReportStyled>
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
                <MainText>דוחות שיחות הורים</MainText>
            </HeaderStyled>
            <CreateText>הוסף דו״ח שיחה חדש</CreateText>
         <CreationStyled>
         <PlusCircleTwoTone  className='plus' onClick={()=>setModalObject({isVisble:true,title:'יצירת נקודות דיווח',type:'CREATE',size:750})} twoToneColor={'rgb(31 169 200 / 85%)'}/>
         </CreationStyled>
        </ParentReportStyled>
    )
}