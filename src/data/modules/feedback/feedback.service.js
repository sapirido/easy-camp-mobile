import {getFeedbacks,storeFeedback} from '../../../fb';

export async function getAllPublishedFeedback(){

    try{
      const allFeedbacks = await getFeedbacks();
      console.log({allFeedbacks});
       const publishedFeedbacks  = Object.values(allFeedbacks).filter(feedback => feedback.published);
       return publishedFeedbacks;
    } catch(err){
        console.error(err);
    }
}

export async function saveFeedback(campId,week,childId,feedback){

    try{
        return await storeFeedback(campId,week,childId,feedback);
    } catch(err) {
        console.error(err);
    }
}