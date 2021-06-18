import _ from 'lodash';
import {createPointReport,getAllPointReports, deletePointReport,createParentReport,getAllParentReportById,updatePointStatus,storeWaterChildReport,checkDailyReport,getChildrens,updateChildTransport} from './report.service';
import {SET_REPORT_POINTS,SET_SELCTED_PARENT_REPORTS,SET_SELECTED_REPORT, SET_WATER_REPORTS,SET_ALL_CHILDRENS} from './report.types';

export function setPointReports(reports){
    return{
        type:SET_REPORT_POINTS,
        payload:reports
    }
}
export function setParentReport(reports){
    return{
        type:SET_SELCTED_PARENT_REPORTS,
        payload:reports
    }
}

export function addNewReport(report){
    return async function _(dispatch){
        await createPointReport(report);
        const allReports = await getAllPointReports();
        dispatch(setPointReports(allReports));
    }
}


export function getReportPoints(transportId){
    return async function _(dispatch){
        const allReports = await getAllPointReports(transportId);
        dispatch(setPointReports(allReports));
        return allReports;
    }
}

export function removeReportPoint(date){
    return async function _(dispatch){
        await deletePointReport(date);
        const allUpdatedReports = await getAllPointReports();
        dispatch(setPointReports(allUpdatedReports));
    }
}

export function addNewParentReport(instructionId,report){
    return async function _(dispatch){
        await createParentReport(instructionId,report);
        const allInstructionReport = await getAllParentReportById(instructionId);
        dispatch(setParentReport(allInstructionReport));
    }
}

export function updatePointAsDone(transportId,point,report,isLast){
    console.log({report});
    return async function _(dispatch){ 
         await updatePointStatus(transportId,point,report,isLast);
        const allReports = await getAllPointReports(transportId);
        dispatch(setPointReports(allReports));   
    }
}

export function setSelectedReport(selectedReport){
    return{
        type:SET_SELECTED_REPORT,
        payload:selectedReport
    }
}

export function setWaterChildReport(campId,groupNumber,childId,date,selectedTime,isDrink){
    return async function _(dispatch){
        storeWaterChildReport(campId,groupNumber,childId,date,selectedTime,isDrink);
    }
}

function setWaterReports(report){
return {
    type:SET_WATER_REPORTS,
    payload:report
}
}

export function checkWaterReport(campId,groupNumber,childIndex,childId,date,selectedTime){
    return async function _(dispatch){
        let checked = false;
        const dailyReport = await checkDailyReport(campId,groupNumber,childIndex,date);
        console.log({dailyReport});
        if(dailyReport && dailyReport[selectedTime]){
            checked = dailyReport[selectedTime].isDrinkWater;
        }
        dispatch(setWaterReports({id:childId,isDrink:checked}));
    }
}

function setAllChildrens(childrens){
    return {
        type:SET_ALL_CHILDRENS,
        payload:childrens
    }
}

export function  getAllChildrens(){
    return async function _(dispatch){
        const allChildrens = await getChildrens();
        dispatch(setAllChildrens(allChildrens));
    }
}

export function updatedChildTransportCollect(children,date){
 return async function _(){
     await updateChildTransport(children,date,'collect');
 }
}

export function updateChildTransportArrived(children,date){
    return async function _(){
        await updateChildTransport(children,date,'arrived');
    }
}
