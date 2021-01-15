import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import { PRIMARY, WHITE } from '../../common/styles/colors';

const ButtonStyled = styled.div`
width:${({width}) => width || '100%'};

.ant-btn{
    height:3rem;
    background-color:${({backgroundColor}) => backgroundColor};
    color:${({textColor}) => textColor };
    font-family:almoni-regular;
    font-weight:600;
    font-size:1.3rem
}
`

export default function ECButton({handleClicked,buttonText,backgroundColor,textColor}){

    return(
    <ButtonStyled backgroundColor={backgroundColor} textColor={textColor}>
    <Button shape={'round'} block onClick={handleClicked}>{buttonText}</Button>
    </ButtonStyled>
    )
}