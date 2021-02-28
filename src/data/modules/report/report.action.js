import {createPointReport,getAllPointReports, deletePointReport,createParentReport,getAllParentReportById} from './report.service';
import {SET_REPORT_POINTS,SET_SELCTED_PARENT_REPORTS} from './report.types';

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


export function getReportPoints(){
    return async function _(dispatch){
        const allReports = await getAllPointReports();
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