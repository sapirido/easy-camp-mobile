import styled from 'styled-components';
import {PRIMARY,WHITE} from './colors';

export const HeaderStyled = styled.div`
padding-bottom:150px;
text-align:center;
display:flex;
flex-direction:column;
`

const Button = styled.button`
width:100%;
height:40px;
color:white;
border:1px solid lightgray;
cursor: pointer;
scale:1.1;
`

export const ActionButton = styled(Button)`
background-color:green;
`

export const ErrorButton = styled(Button)`
background-color:red;
`
export const MainText = styled.span`
font-size:36px;
text-decoration: underline;
padding-bottom:20px;
`
export const DescriptionText = styled.span`
font-size:24px;
`

export const FormStyled = styled.div`
width:20%;
height:100%;
margin:auto;
`

export const FormHeaderStyled = styled.div`
padding-bottom:30px;
text-align:center;
height:15%;
`
export const Text = styled.span`
font-size:24px;
color:${({color}) => color || WHITE};
`

export const IconSVG = styled.img`
height:1.3rem;
width:1.3rem;
margin-left:1rem;
font-family:almoni-meduim;
`

export const BlockContainer = styled.div`
position:absolute;
bottom:-10px;
height:${props => props.height || '75%' };
width:100%;
background-color:${PRIMARY};
border-top-left-radius:50px;
border-top-right-radius:50px;
overflow:hidden;
`