import Checkbox from 'antd/lib/checkbox/Checkbox';
import styled from 'styled-components';

import TextArea from 'antd/lib/input/TextArea';
import React, {useState} from 'react';
import {QuestionWrapper ,AnswerWrapper, QuestionContainer} from './Feedbacks.styled'
import { WHITE } from '../../common/styles/colors';
import { Radio, Space } from 'antd';
export default function Question({question,handleFeedback}){

    const [feedback,setFeedback] = useState({});
    const [radioVal,setRadioVal] = useState();

    function setSelectedAnswer(e,answer,question){
        let  updatedFeedback = {};
        if(e.target.checked){
             updatedFeedback = {
                ...feedback,
                [question.order]:{
                    question: question.question,
                    questionType:question.questionType,
                    answer:feedback[question.question]?.answer?.length ? [...feedback[question.question].answer,answer]: [answer]
                } 
            }
        }else{
            updatedFeedback = {
                ...feedback,
                [question.order]:{
                   question: question.question,
                    questionType:question.questionType,
                    answer:feedback[question.question]?.answer.length && feedback[question.question]. answer.filter(ans => ans !== answer)
                }
            }
        }
        setFeedback(updatedFeedback);
        handleFeedback(updatedFeedback);
    }
    function regularAnswerHandler(e,question){
        const updatedFeedback = {
            ...feedback,
            [question.order]: {
                question: question.question,
                questionType: question.questionType,
                answer:e.target.value
            }
        }
        setFeedback(updatedFeedback);
        handleFeedback(updatedFeedback);
    }



    function renderQuestionByType(question){
        switch(question.questionType){
            case 'single':
                return <TextArea onChange={(e) => regularAnswerHandler(e,question)}/>
            case 'multi':
                return question?.answers?.map(answer => <CheckboxWrapper onChange={(e) => setSelectedAnswer(e,answer,question)} >{answer}</CheckboxWrapper>)
            case 'multi_select':
                return(
                    <Radio.Group onChange={(e) =>{
                        regularAnswerHandler(e,question);
                        setRadioVal(e.target.value);
                    }}
                    value={radioVal}>
                    <Space direction="vertical">
                    {question?.answers?.map((answer =>(
                        <RadioWrapper value={answer}>{answer}</RadioWrapper>
                    )))}
                    </Space>
                    </Radio.Group>
                )
        }
    }

    return(
    <QuestionContainer>
        <QuestionWrapper>{question.question}</QuestionWrapper>
        <AnswerWrapper>
            {renderQuestionByType(question)}
        </AnswerWrapper>
    </QuestionContainer>
    )
}

const CheckboxWrapper = styled(Checkbox)`
color:${WHITE};
font-size:20;
display:flex;
flex-direction:row-reverse;
`

const RadioWrapper = styled(Radio)`
color: ${WHITE};
font-size: 20px;
`