import React from 'react';
import {Select} from 'antd';
const {Option} = Select;



export default function ECSelect({width = 167,options = [],placeholder = ''}){


    function onSearch(val){
         console.log({val});
    }

    return(
        <Select
          showSearch
          style={{width,marginBottom:20}}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          placeholder={placeholder}
          optionFilterProp="children"
          onSearch={onSearch}>
              {options.map((option,index) => <Option value={option} key={index}>{option}</Option>)}
          </Select>
    )
}