import styled from 'styled-components';
import {WHITE} from '../../common/styles/colors';
export const TaskStyled = styled.div`
display:flex;
height:8rem;
margin-bottom:2rem;
`

export const TaskContentStyled = styled.div`
border-radius:2.2rem;
width:100%;
background-color:${({background}) =>background};
color:${WHITE};
display:flex;
flex-direction:column;
padding:1rem;
padding-right:1.3;
font-family:almoni-regular;
text-align:right;
`
export const HorizontalContainer = styled.div`
margin-left:1rem;
height:100%;
border-left:${({color}) => `2px dashed ${color}`};
`
const SmallText = styled.div`
font-weight:400;
font-size:1rem;
padding-bottom:0.2rem;
`
export const TimeContiner = styled(SmallText)``


export const TitleStyled = styled.div`
font-weight:600;
font-size:1.4rem;
padding-bottom:0.2rem;
`

export const DescriptionStyled = styled(SmallText)``

export const SideStyled = styled.div`
display:flex;
flex-direction:column;
`
export const BallStyled = styled.div`
height:20px;
width:18px;
border-radius:15px;
margin-bottom:0.5rem;
margin-left:0.45rem;
border:${({color}) => `3px solid ${color}`};
`