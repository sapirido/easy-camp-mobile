import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import Description from './Description';
import { EMPLOYEE_TYPE } from '../../common/constants';

export default function DetailsList({list,camp,onEditClicked,onDeleteClicked,avatar,paging,isEmployeePage}){



    return(
        <List
        itemLayout={'horizontal'}
        dataSource={list}
        pagination={paging ? {
            pageSize:3,
            onChange: page => console.log(page)
          } : null}
        renderItem={(item,index)=>(
            <List.Item
             key={index}
              actions={!isEmployeePage ?
                  [<a><EditOutlined onClick={() => onEditClicked(item.id,camp,item)}/></a>,<a style={{color:'red'}}><DeleteOutlined disabled onClick={()=>onDeleteClicked(item.id,camp.camp_id)} /></a>]
                  :
                  null
                }
            >
                <List.Item.Meta
                key={index}
                avatar={<Avatar size={64} src={avatar}/>}
                description={<Description item={item} type={item.type}/>}/>
            </List.Item>
        )}
        />
    )
}