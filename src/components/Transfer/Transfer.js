import React,{useState,useEffect} from 'react';
import {Transfer,Button} from 'antd';
import styled from 'styled-components';

const TransferStyled = styled.div`
`
const InstructionStyled = styled.div`
text-align:center;
font-size:18px;
padding-bottom:12px;
`
const ButtonContainerStyled = styled.div`
padding-top:12px;
`

export default function TransferData({instruction,childrens,handleSaveGroup}){

    const [groupChildren,setGroupChildren] = useState([]);
    const [selectedChildrens,setSelectedChildrens] = useState([]);
    const [groupData,setGroupData] = useState([]);
    const [disabled,setDisabled] = useState(false);
    const childrensData = childrens.map(children =>{
        return{
            key:Number(children.id).toString(),
            ...children
        }
    });

    useEffect(() => {
        console.log({childrens});
    }, [childrens])

    function handleChange(nextTargetKeys,direction,moveKeys){
        console.log({nextTargetKeys});
        const selectedChildrens = childrensData.filter(({key}) => nextTargetKeys.includes(key));

        setGroupChildren(nextTargetKeys);
        setGroupData(selectedChildrens);
    }

    function handleSelectedChange(sourceSelectedKeys,targetSelectedKeys){
        setSelectedChildrens([...sourceSelectedKeys,...targetSelectedKeys]);

    }

    function handleScroll(direction, e){
        console.log('direction:', direction);
        console.log('target:', e.target);
      };

      const handleFilter = (inputValue,option) =>{
          const stringId = typeof option.id === 'number' ? Number(option).toString() : option;
            return stringId.indexOf(inputValue) > -1 || option.childrenName.indexOf(inputValue) > -1;
      }

      const handleSearch = (dir, value) => {
        console.log('search:', dir, value);
      };

      function saveGroup(){
        const finalgroup = {
            instruction,
            childrens:groupData
        }
        handleSaveGroup(finalgroup);
        setDisabled(true);
      }


    return(
        <TransferStyled>
            <InstructionStyled>
                {instruction.name}
            </InstructionStyled>
        <Transfer
        showSearch
        filterOption={handleFilter}
        dataSource={childrensData}
        titles={['Source', 'Target']}
        targetKeys={groupChildren}
        selectedKeys={selectedChildrens}
        onChange={handleChange}
        onSelectChange={handleSelectedChange}
        onScroll={handleScroll}
        disabled={disabled}
        render={children => `${children.childrenName} ${children.familyName}`}
        oneWay
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <ButtonContainerStyled>
          <Button   disabled={disabled || groupChildren.length === 0} type="primary" onClick={saveGroup}>אישור קבוצה</Button>
      </ButtonContainerStyled>
      </TransferStyled>
    )
}