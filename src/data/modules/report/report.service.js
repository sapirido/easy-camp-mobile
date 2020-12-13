
import {addReportPoint,getReportPoints, removeReportPoint} from '../../../fb';

export async function createPointReport(report){
    try{
        return await addReportPoint(report);
    }catch(err){
        console.error(err);
    }
}

export async function getAllPointReports(){
    return await getReportPoints();
}
export async function deletePointReport(date){
    return await removeReportPoint(date);
}