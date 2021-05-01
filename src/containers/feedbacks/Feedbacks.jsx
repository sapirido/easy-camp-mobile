import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PRIMARY, SECONDARY } from '../../common/styles/colors';
import { BlockContainer } from '../../common/styles/common.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import { getPublishedFeedback,setFeedback } from '../../data/modules/feedback/feedback.actions';
import {FeedbackContainer,FeedbacksWrapper,Feedback} from './Feedbacks.styled';

export default function Feedbacks({history}){

    const dispatch = useDispatch();
    const { publishedFeedbacks } = useSelector(({feedback}) => feedback);

    useEffect(() => {
        dispatch(getPublishedFeedback());
    },[])

    function setSelectedFeedback(feedback){
        dispatch(setFeedback(feedback));
        history.push(`/feedbacks/${feedback.week}`)
    }

    console.log({publishedFeedbacks});
    return (
        <FeedbackContainer>
        <HeaderPage
        title={'- משו״ב -'}
        size={1.2}
        color={SECONDARY}
      />
            <BlockContainer style={{height:'70%',right:0}}>
            <FeedbacksWrapper>
            {publishedFeedbacks.map((feedback) =>(
                <Feedback onClick={() => setSelectedFeedback(feedback)}>
                משוב שבוע {feedback.week}
                </Feedback>
                ))}
                </FeedbacksWrapper>
            </BlockContainer>
        </FeedbackContainer>
    )
}