import styled from 'styled-components';
import {PRIMARY, WHITE} from '../../common/styles/colors';

export const AttendanceItemWrapper = styled.div`
background-color:${PRIMARY};
border-radius: 12px;
display: grid;
grid-template-columns: 2fr 2fr 1fr;
grid-row-gap: 15px;
grid-column-gap: 20px;
width:100%;
height: 35px;
align-items: center;
padding: 0 0 0 15px;
`

export const AttendancesWrapper = styled.div`
width:100%;
display: grid;
grid-gap: 15px;
grid-template-columns: 1fr;
padding:25px 0;
overflow:scroll;
height:fit-content;
max-height:33rem;
`
export const Name = styled.div`
color:${WHITE};
font-weight:500;
`

export const TrasnportNumber = styled.div`
color:${WHITE};
font-weight:500;
`

export const ButtonWrapper = styled.div`
width:100%;
`