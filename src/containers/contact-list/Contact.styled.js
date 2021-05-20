import styled from 'styled-components';
import { PRIMARY, WHITE } from '../../common/styles/colors';

export const ContactStyled = styled.div`
text-align:center;
width:100%;
`

export const ListStyled = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
height:33rem;
max-height:33rem;
overflow:scroll;
padding-top:3rem;
`

export const ContactItemStyled = styled.div`
display:flex;
justify-content:space-between;
background-color:${({backgroundColor}) => backgroundColor};
border-radius:30px;
height:95px;
width:47%;
padding:12px;
margin-bottom:2rem;
`

export const InfoStlyed = styled.div`
display:flex;
flex-direction:column;
flex:3;
`

export const InfoText = styled.span`
font-size:${({size}) =>size}rem;
font-weight:${({fontWeight}) => fontWeight || 400};
text-align:right;
color:${WHITE};
`

export const PhoneStyled = styled.a`
flex:1;
display:flex;
justify-content:center;
align-items:center;
`
