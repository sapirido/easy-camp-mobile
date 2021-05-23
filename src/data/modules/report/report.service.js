
import {addReportPoint,getReportPoints, removeReportPoint,getParentReportById,addParentReport,updateTransportPoint,saveChildReport} from '../../../fb';

export async function createPointReport(report){
    try{
        return await addReportPoint(report);
    }catch(err){
        console.error(err);
    }
}

export async function getAllPointReports(transportId){
    return await getReportPoints(transportId);
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
    const updatedReport = {
        ...report,
        id:reportId
    }
    return await addParentReport(instructionId,updatedReport);
}

export async function updatePointStatus(transportId,point,report = {},isLast){

    console.log({report});
    const updatedPoints = report?.points?.map(p => point.order === p.order ?({
        ...p,
        done:true
    }): p);

    let updatedReport;
    if(isLast && report.dest_done){
        updatedReport = {
            ...report,
            src_done:true
        }
    }else if(isLast && !report.dest_done){
        updatedReport = {
            ...report,
            dest_done:true,
        }
    }else{
        updatedReport ={ ...report };
    }
    updatedReport = {...updatedReport,points:updatedPoints};
    
    return await updateTransportPoint(transportId,updatedReport);
}

export async function storeWaterChildReport(campId,groupNumber,childId,date,selectedTime,isDrink){
    return await saveChildReport(campId,groupNumber,childId,date,selectedTime,isDrink)
}