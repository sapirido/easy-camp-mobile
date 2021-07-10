import styled, { css } from 'styled-components';
import {PRIMARY, WHITE, ERROR} from '../../common/styles/colors';

export const AttendanceItemWrapper = styled.div`
background-color:${PRIMARY};
border-radius: 18px;
display: grid;
grid-template-columns: 2fr 2fr 1fr;
grid-row-gap: 15px;
grid-column-gap: 20px;
width:100%;
height: fit-content;
align-items: center;
padding: 15px;
opacity:${({disabled}) => disabled ? 0.4 : 1};
${({isNotNeedToCome}) => isNotNeedToCome && css`
border: 3px solid ${ERROR};
height:100%;
`}
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
padding-bottom: 50px;
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
padding-top:12px;
`

export const SwitcherWrapper = styled.div`
display:flex;
justify-content: center;
grid-gap:15px;
grid-template-columns:${({isGroup}) => isGroup ? '1fr' : '1fr 1fr'};

`

export const PaginationWrapper = styled.div`
`
export const HeaderWrapper = styled.div`
display: flex;
justify-content: center;
`