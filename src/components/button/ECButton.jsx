import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import { PRIMARY,WHITE } from '../../common/styles/colors';

const ButtonStyled = styled.div`
width:${({width}) => width || '100%'};  

.ant-btn{
    height:3rem;
    background-color:${({backgroundColor}) => backgroundColor || PRIMARY};
    color:${({textColor}) => textColor || WHITE };
    font-family:almoni-regular;
    font-weight:600;
    font-size:1.3rem;
    border:${({borderColor}) =>`2px solid ${borderColor}`};
}
`

export default function ECButton({handleClicked,disabled = false,buttonText,backgroundColor,textColor,borderColor = '',loading = false,style = {}}){
    
    return(
    <ButtonStyled backgroundColor={backgroundColor} textColor={textColor} borderColor={borderColor} style={{...style}}>
    <Button  loading={loading} disabled={disabled} shape={'round'} block onClick={handleClicked}>{buttonText}</Button>
    </ButtonStyled>
    )
}