import {getFeedbacks} from '../../../fb';

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