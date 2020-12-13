import {createPointReport,getAllPointReports, deletePointReport} from './report.service';
import {SET_REPORT_POINTS} from './report.types';
export function setPointReports(reports){
    return{
        type:SET_REPORT_POINTS,
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