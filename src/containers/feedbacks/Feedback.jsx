import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { SECONDARY } from '../../common/styles/colors';
import { BlockContainer } from '../../common/styles/common.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import { FeedbackContainer, ContentContainer } from './Feedbacks.styled';
import Question from './Question'

export default function Feedback({history}){

    const dispatch = useDispatch();
    const { selectedFeedback } = useSelector(({feedback}) => feedback);
    // const [selectedFeedback,setSelectedFeedback] = useState();

    console.log({selectedFeedback})
    if(!selectedFeedback) return null;

    return(
        <FeedbackContainer>
        <HeaderPage
        title={`משוב שבוע ${selectedFeedback.week}`}
        size={1.2}
        color={SECONDARY}
      />
      <BlockContainer style={{height:'80%',right:0}}>
        <ContentContainer>
        {selectedFeedback.questions.map((question) => (
            <Question question={question}/>
        ))}
        </ContentContainer>
      </BlockContainer>


        </FeedbackContainer>
    )
}