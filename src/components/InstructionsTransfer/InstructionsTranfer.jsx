import React,{useState,useEffect} from 'react';
import TransferData from '../Transfer/Transfer';
import styled from 'styled-components';
import { Button,Col } from 'antd';

const InstructionsTransferStyled = styled.div`
display:flex;
justify-content:space-evenly;
width: 100%;
max-width: 90%;
flex-wrap: wrap;
margin: auto;
`
const IntructionsWithButton = styled.div`
display:flex;
flex-direction:column;
width:100%;

`
const InstructionTransferStyled = styled.div``

const ButtonContainer = styled.div`
padding-top:
display:flex;
justify-content:center;
margin-top:50px;

`

export default function InstructionsTransfer({instructions,setGroups,childrens}){
    const [allGroups,setAllGroups] = useState([]);
    const [notSelectedChildrens,setNotSelectedChildrens] = useState(childrens);

    function handleSaveGroup(groupData){
        setAllGroups([...allGroups,groupData]);
        const selectedChildrens = groupData.childrens.map(child=>child?.id);
        const notSelected = notSelectedChildrens.filter(({id})=>!selectedChildrens.includes(id))
        console.log({notSelected});
        setNotSelectedChildrens(notSelected);
    }

    useEffect(() => {
        
        console.log({notSelectedChildrens});
        
    }, [handleSaveGroup])

    console.log({allGroups});

    return(
        <IntructionsWithButton>
        <InstructionsTransferStyled>
        {instructions.map((instruction,index)=>(
            <Col span={6}>
            <InstructionTransferStyled>
        <TransferData instruction={instruction} childrens={notSelectedChildrens} key={index} handleSaveGroup={handleSaveGroup}/>
        </InstructionTransferStyled>
        </Col>
        ))}
        </InstructionsTransferStyled>
        <ButtonContainer>
        <Button width={200} onClick={()=>setGroups(allGroups)} type={'dashed'}>אשר את כל הקבוצות</Button>
        </ButtonContainer>
        </IntructionsWithButton>

    )
}