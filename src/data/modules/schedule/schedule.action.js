import {SET_ALL_DAYS} from './schedule.types';
import {createDailySchedule,getAllDailys} from './schedule.service';


function setAllSchedules(allDays){
    return{
        type:SET_ALL_DAYS,
        payload:allDays
    }
}
export function addDailySchedule(dailySchedule){
    return async function _(dispatch){
        try{
            await createDailySchedule(dailySchedule);
            const allDailySchedules = await getAllDailys();
            dispatch(setAllSchedules(allDailySchedules))
        }catch(err){

        }
    }
}