import React, {useState} from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { PRIMARY, SECONDARY, WHITE } from '../../common/styles/colors';
import { BlockContainer } from '../../common/styles/common.styled';
import HeaderPage from '../../components/header-page/HeaderPage';
import { ContentContainer, FeedbackContainer, ContentBox } from './Feedbacks.styled';
import Question from './Question';
import ECButton from '../../components/button/ECButton';
import { sendFeedback } from '../../data/modules/feedback/feedback.actions';
import Lottie from 'react-lottie';
import success from '../../assets/lottie/success_lottie.json';

export default function Feedback({history}){

    const dispatch = useDispatch();
    const [feedback,setFeedback] = useState({});
    const { selectedFeedback } = useSelector(({feedback}) => feedback);
    const { activeUser } = useSelector(({auth}) => auth);
    const [feedbackSent,setFeedbackSent] = useState(false);

    const defaultOptions = {
      loop:true,
      autoplay:true,
      animationData: success,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    if(!selectedFeedback) return null;

    function handleFeedback(questionFeedback){
      const feed = {
        ...feedback,
        ...questionFeedback
      }
      setFeedback(feed);
    }

    function handleFeedbackSend(){
      dispatch(sendFeedback(activeUser.campId,selectedFeedback.week,activeUser.childId,feedback))
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackSent(false);
        history.push('/')
      },4000)
    }
    return(
        <FeedbackContainer>
        <HeaderPage
        title={`משוב שבוע ${selectedFeedback.week}`}
        size={1.2}
        color={SECONDARY}
      />
      <BlockContainerWrapper>
      {
        feedbackSent ? <ContentBox> <Lottie options={defaultOptions} height={250} width={250}/> </ContentBox> 
        :
         <ContentContainer>
        {selectedFeedback.questions?.map((question,index) => (
            <Question handleFeedback={handleFeedback} key={index} question={question}/>
        ))}
        <ECButtonWrapper handleClicked={() => handleFeedbackSend()} buttonText={'שלח'} backgroundColor={PRIMARY} textColor={WHITE}/>
        </ContentContainer>
      }
        
      </BlockContainerWrapper>


        </FeedbackContainer>
    )
}

const BlockContainerWrapper = styled(BlockContainer)`
height:80%;
right:0;
overflow-y:scroll;
`

const ECButtonWrapper = styled(ECButton)`
padding-top:20px;
`