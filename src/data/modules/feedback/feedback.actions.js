import { SET_PUBLISHED_FEEDBACK, SET_SELECTED_FEEDBACK } from './feedback.types';
import { getAllPublishedFeedback } from './feedback.service';

function setPublishedFeedbacks(feedbacks){
    return{
        type:SET_PUBLISHED_FEEDBACK,
        payload:feedbacks
    }
}

export function getPublishedFeedback(){
    return async function _(dispatch){
        const publishedFeedback = await getAllPublishedFeedback();
        dispatch(setPublishedFeedbacks(publishedFeedback));
    }
}

export function setFeedback(feedback){
    return{
        type:SET_SELECTED_FEEDBACK,
        payload:feedback
    }
}