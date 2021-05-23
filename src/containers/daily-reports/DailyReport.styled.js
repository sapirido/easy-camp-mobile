import styled from 'styled-components';

export const DailyReportContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:fit-content;
overflow:scroll;
`

export const ChildrenReportWrapper = styled.div`
width:100%;
display: grid;
grid-gap: 20px;
grid-template-columns: 1fr;
padding:25px 0;
overflow:scroll;
height:fit-content;
max-height:33rem;
`