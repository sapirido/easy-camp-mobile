import React from 'react';
import styled from 'styled-components';
import { PRIMARY } from '../../common/styles/colors';

const HeaderStyled = styled.span`
font-size:${({size}) => size || 1}rem;
color: ${({color}) => color || PRIMARY};
font-family:rivkabau-regular;
text-align:center;
`

export default function HeaderPage({title,color,size,style}){

    return(
    <HeaderStyled style={{...style}} color={color} size={size}>{title}</HeaderStyled>
    )
}