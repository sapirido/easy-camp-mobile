
import {addReportPoint,getReportPoints, removeReportPoint,getParentReportById,addParentReport} from '../../../fb';

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

export async function getAllParentReportById(instructionId){
    return await getParentReportById(instructionId);
}

export async function createParentReport(instructionId,report){
    let reportId = 0;
    for(let c in report.parentName){
        reportId+= c.charCodeAt(0);
    }
    console.log({reportId});
    const updatedReport = {
        ...report,
        id:reportId
    }
    return await addParentReport(instructionId,updatedReport);
}