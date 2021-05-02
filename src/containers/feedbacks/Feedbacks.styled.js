import styled from 'styled-components';
import { PRIMARY, WHITE } from '../../common/styles/colors';

export const FeedbackContainer = styled.div`
height:100%;
width:100%;
text-align:center;
`

export const FeedbacksWrapper = styled.div`
display:flex;
flex-direction:column;
padding:50px 60px;
justify-content: center;
align-items: center;
`

export const Feedback = styled.div`
width:174px;
height:72px;
border-radius:25px;
padding:15px 20px;
text-align:center;
display:flex;
justify-content:center;
align-items:center;
color:${PRIMARY};
font-size:24px;
background-color:${WHITE};
`

export const ContentContainer = styled.div`
overflow-x: hidden;
overflow-y: auto;
text-align:justify;
height:85%;
padding:30px;
`

export const QuestionWrapper = styled.div`
color:${WHITE};
font-size:24px;
text-align:right;
`

export const AnswerWrapper = styled.div`
display:flex;
flex-direction:column;
text-align:right;
align-items: flex-end;
`

export const QuestionContainer = styled.div`
padding:25px 0px;
`