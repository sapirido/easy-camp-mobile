import styled from 'styled-components';
import { SECONDARY, WHITE, YELLOW_CARD } from '../../common/styles/colors';

export const DailyAttendanceWrapper = styled.div`
width:100%;
`

export const Wrapper = styled.div`
height: 70px;
background-color: ${WHITE};
`

export const CounterWrapper = styled.div`
width:70px;
height: 40px;
background-color: ${YELLOW_CARD};
color:${WHITE};
margin:auto;
text-align: center;
font-size:18px;
font-weight: 600;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: center;
margin-top:0.7rem;
`

export const IconStyled = styled.div`
color:${WHITE};
display:flex;
text-align:center;
align-items:center;
justify-content:${({justifyContent}) => justifyContent ? justifyContent : 'center'};
padding-top:0.4rem;
font-size:1rem;
font-weight:600;
width:${({width}) => width ? width : '3rem'};
`