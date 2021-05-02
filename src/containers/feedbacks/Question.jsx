import Checkbox from 'antd/lib/checkbox/Checkbox';
import TextArea from 'antd/lib/input/TextArea';
import React, {useState} from 'react';
import {QuestionWrapper ,AnswerWrapper, QuestionContainer} from './Feedbacks.styled'

export default function Question({question}){

    const [answer,setAnswer] = useState('');

    function setSelectedAnswer(e,answer){

    }
    return(
        <QuestionContainer>
        <QuestionWrapper>{question.question}</QuestionWrapper>
        <AnswerWrapper>
        
        {question.questionType === 'multi' ? (
            <>
            {question?.answers?.map(answer =>(
                <Checkbox  style={{color:`#ffffff`,fontSize:20,display:'flex',flexDirection:'row-reverse'}}  onChange={e => setSelectedAnswer(e,answer) }>{answer}</Checkbox>
            ))}
            </>
            ) : <TextArea/>}
            </AnswerWrapper>
        </QuestionContainer>
    )
}