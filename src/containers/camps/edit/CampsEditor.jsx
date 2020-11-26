import React, { useEffect, useState } from 'react';
import {Modal} from 'antd';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Text } from '../../../common/styles/common.styled';
import TabsCard from '../../../components/cards/TabsCard';
import { getAllCamps, setCampManager, setInstruction, setChildren } from '../../../data/modules/camp/camp.action';
import { CampCardStyled, CampsCardStyled, CampsEditorHeader, CampsEditortSyled } from './CampEditor.styled';
import DetailsList from '../../../components/lists/DetailsList';
import {MODAL_TYPES} from '../../../common/constants';
import EditEmployeeData from '../../../components/modals/EditEmployeeData';
import EditChildren from '../../../components/modals/EditChildren';
const managerAvatar = require('../../../assets/images/manager.jpeg');
const instructionAvatar = require('../../../assets/images/instruction.png');
const childrenAvatart = require('../../../assets/images/children.png');


export default function CampsEditor({history}){
    const [visible,setVisible] = useState(false);
    const [modalType,setModalType] = useState('');
    const [modalPayload,setModalPayload] = useState(null);
    const [data,setData] = useState(null);
    const dispatch = useDispatch();
    const { camps } = useSelector(({camp}) => camp);

    useEffect(()=>{
        dispatch(getAllCamps());
    },[])

    const tablist = [
        {
            key:'general',
            tab:'נתונים כללים'
        },
        {
            key:'instructions',
            tab:'מדריכים'
        },
        {
            key:'groups',
            tab:'קבוצות'
        }
    ]

    const contentsList = (camp) => {
        let childrenArray =[];
       camp.groups.forEach(group => {
           group.childrens = group.childrens.map(child =>({
               ...child,
               instruction_name:group.instruction.name
           }))

            childrenArray.push(...group.childrens);
      })    
        return{
        general:<DetailsList list={[camp.camp_manager]} camp={camp} onEditClicked={editManager} onDeleteClicked={(item)=>console.log('delete',item)} avatar={managerAvatar}/>,
        instructions:<DetailsList list={camp.instructions} camp={camp} onEditClicked={editInstruction} onDeleteClicked={(item)=>console.log('delete',item)} avatar={instructionAvatar}/>,
        groups:<DetailsList list={childrenArray} camp={camp} onEditClicked={editChildren} onDeleteClicked={(item)=>console.log('delete',item)} avatar={childrenAvatart} paging/>
      }  
    }

    

    function editManager(managerId,camp,managerData){
        batch(()=>{
            setData(managerData);
            setModalType(MODAL_TYPES.EDIT_CAMP_MANAGER);
            setVisible(true)
            setModalPayload({managerId,camp,managerData});
        })
    }

    function editInstruction(instructionId,camp,instructionData){
        batch(()=>{
            setData(instructionData);
            setModalType(MODAL_TYPES.EDIT_INSTRUCTION);
            setVisible(true);
            setModalPayload({instructionId,camp,instructionData});
        })
    }

    function editChildren(childrenId,camp,childrenData){
        batch(()=>{
            setData(childrenData);
            setModalType(MODAL_TYPES.EDIT_CHILDREN);
            setVisible(true);
            setModalPayload({childrenId,camp,childrenData});
        })
    }

    function resetModal(){
        batch(()=>{
            setVisible(false);
            setData(null);
            setModalType(null);
            setModalPayload(null);
        })
    }
    

    function renderModal(){
        switch(modalType){
            case MODAL_TYPES.EDIT_CAMP_MANAGER:
                return(
                    <Modal
                     title={`עריכת רכז מחנה - ${modalPayload?.camp?.camp_name}`}
                     visible={visible}
                     okText={'מאשר נתונים'}
                     cancelText={'ביטול'}
                     onOk={()=>{
                         dispatch(setCampManager(modalPayload?.camp?.camp_id,modalPayload?.managerId,data));
                         resetModal();
                     }}
                     onCancel={()=>{
                         setVisible(false)
                         resetModal();
                        }}
                     >
                       <EditEmployeeData data={data} editData={editData}/> 
                     </Modal>
                )
                case MODAL_TYPES.EDIT_INSTRUCTION:
                    return(
                        <Modal
                        title={`עריכת מדריך - ${modalPayload?.instructionId}`}
                        visible={visible}
                        okText={'מאשר נתונים'}
                        cancelText={'ביטול'}
                        onOk={()=>{
                            dispatch(setInstruction(modalPayload?.camp,modalPayload?.instructionId,data));
                            resetModal();
                        }}
                        onCancel={()=>{
                            resetModal();
                           }}
                        >
                          <EditEmployeeData data={data}  editData={editData}/> 
                        </Modal>
                    )
                    case MODAL_TYPES.EDIT_CHILDREN:
                        return (
                            <Modal
                            title={`עריכת חניך - ${modalPayload.childrenId}`}
                            visible={visible}
                            okText={'מאשר נתונים'}
                            cancelText={'ביטול'}
                            onOk={()=>{
                                dispatch(setChildren(modalPayload?.camp,modalPayload?.childrenId,data));
                               resetModal();
                            }}
                            onCancel={()=>{
                                resetModal();
                               }}
                            >
                              <EditChildren data={data} editData={editData}/> 
                            </Modal>
                        )
                default:
                    return null
        }
        

    }

    function editData(key,value){
        const updatedData = {
            ...data,
            [key]:value,
        }
        setData(updatedData);
    }


function editHandler(camp){
    console.log({camp});
}
    return(
        <CampsEditortSyled>
            {renderModal()}
            <CampsEditorHeader>
                <Text>עריכת מחנות</Text>
            </CampsEditorHeader>
            <CampsCardStyled>
                {camps?.map((camp,index)=>(
                    <CampCardStyled>
                        <TabsCard contentList={contentsList(camp)} tabsList={tablist} title={camp.camp_name} onEditClicked={() => editHandler(camp)} key={index}/>
                    </CampCardStyled>
                ))}
            </CampsCardStyled>
        </CampsEditortSyled>
    )
}