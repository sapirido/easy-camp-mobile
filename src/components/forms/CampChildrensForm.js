import React,{useEffect,useState} from 'react'
import readXlsxfile from 'read-excel-file';
import { Table } from 'antd';

export default function CampChildrenForm({}){
    const [columns,setColumns] = useState(null);
    const [data,setData] = useState(null);
useEffect(()=>{
    getDataFromExcel();
   console.log({columns,data})
},[])

const dataMaping  ={
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

function getDataFromExcel(){
    const input  = document.getElementById('uploader');
    if(input){
        input.addEventListener('change',()=>{
            readXlsxfile(input.files[0]).then((row)=>{
                if(row){
                    // setColumns(row[0]);
                    let columns = row[0];
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
                                familyName:children[0],
                                parentName:children[1],
                                childrenName:children[2],
                                graduate:children[3],
                                phone:children[4],
                                neighborhood:children[5],
                                transport:children[6],
                                customerCode:children[7],
                                id:children[8]
                            }
                        })
                    setData(data);
                    setColumns(columns);
                    
                }else{
                    throw new Error('can not fetch data from this file')
                }
                
            })
            .catch((err)=>{
                console.error(err);
            })
        })
    }

}
 
    console.log({columns,data});
    return(
        <>
        <input type="file" id='uploader' placeholder='uploader'/>
        {columns && <Table dataSource={data} columns={columns}/>}
        </>
    )
}