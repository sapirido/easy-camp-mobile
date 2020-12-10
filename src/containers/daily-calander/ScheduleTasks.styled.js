import styled from 'styled-components';

export const TasksStyled = styled.div`
display:flex;
flex-direction:column;
`

export const TaskStyled = styled.div`
border:0.5px solid lightgray;
border-radius:6px;
display:flex;
flex-direction:column;
padding: 10px;
margin-bottom: 12px;
curser:pointer;
justify-content:space-between;
`
export const TaskTitle = styled.span`
font-size:18px;
font-weight:bold;
`

export const TaskDiscription = styled.span`
font-size:15px;
width:60%;
`

export const TitleAndTimeStyled = styled.div`
display:flex;
justify-content:space-between;
`

export const TimeStyled = styled.div`

`

export const TimeText = styled.span`
font-size:15px;
font-weight:bold;
padding-left:10px;
`
export const TimeIcon = styled.span``

export const DescWithActions = styled.div`
display:flex;
display: flex;
justify-content: space-between;
align-items: center;
`
export const ActionsStyled = styled.span``

export const EditTaskStyled = styled.div`
padding:30px;
`
export const DeleteStyled = styled.div`
`
export const ButtonsContainer = styled.div`
display:flex;
padding-top:30px;
`