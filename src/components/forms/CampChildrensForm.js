import { UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Table, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import readXlsxfile from 'read-excel-file';
import { FormHeaderStyled, Text } from '../../common/styles/common.styled';
import { CampChildrenFormStyled } from '../../containers/camps/create/CreateCamp.styled';
import { EmptyStyled, TableStyled, UploaderStyled,ButtonContainerStyle } from './Forms.styled';
export default function CampChildrenForm({setChildrens,checkValidation}){
    const [columns,setColumns] = useState(null);
    const [data,setData] = useState(null);
useEffect(()=>{
    getDataFromExcel();
   console.log({columns,data})
},[])

const dataMaping  = {
    'שם משפחה':'familyName',
    'שם ההורה':'parentName',
    'שם הילד':'childrenName',
    'עולה לכיתה':'graduate',
    'טלפון':'phone',
    'שכונה':'neighborhood',
    'תחנת הסעה':'transport',
    'קוד לקוח':'customerCode',
    'תעודת זהות':'id'

}

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    }
}

function getDataFromExcel(){
    const input  = document.getElementById('uploader');
    if(input){
        input.addEventListener('change',()=>{
            readXlsxfile(input.files?.[0]).then((row)=>{
                if(row){
                    // setColumns(row[0]);
                    let columns = row?.[0];
                    columns = columns.map((column)=>{
                        return{
                            key:column,
                            title:column,
                            dataIndex:dataMaping[column]

                        }
                    })
                    console.log({columns});
                    let data = row.slice(1,row.length);
                    console.log({data});
                    data = data.map((children,index) => {
                            return{
                                key:index,
                                familyName:children?.[0],
                                parentName:children?.[1],
                                childrenName:children?.[2],
                                graduate:children?.[3],
                                phone:children?.[4],
                                neighborhood:children?.[5],
                                transport:children?.[6],
                                customerCode:children?.[7],
                                id:children?.[8]
                            }
                        })
                    setData(data);
                    setColumns(columns);
                    setChildrens(data);
                    
                }else{
                    throw new Error('can not fetch data from this file')
                }
                
            })
            .catch((err)=>{
                console.log('in in catch !!!')
                console.error(err);
            })
        })
    }

}


 
    return(
<CampChildrenFormStyled>
    <FormHeaderStyled>
        <Text>פרטי ילדי המחנה</Text>
    </FormHeaderStyled>
    <UploaderStyled>
    <Upload type="file" id="uploader" {...props}>
        <Button icon={<UploadOutlined />}>העלאת קובץ</Button>
    </Upload>
</UploaderStyled>
<Divider dashed type={'horizontal'}/>
    {columns ?
    (<TableStyled>
     <Table  dataSource={data} columns={columns} pagination={{ pageSize: 20 }} scroll={{ y: 240 }} />
     </TableStyled>):(
         <EmptyStyled>
         <Empty/>
         </EmptyStyled>
     )
     }
    </CampChildrenFormStyled>        

    )
}