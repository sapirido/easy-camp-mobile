import {SET_ALL_DAYS,SET_DAILY} from './schedule.types';
import {createDailySchedule,getAllDailys,setTask,deleteTaskById,deleteDailySchedule,getDailyScheduleByDate} from './schedule.service';


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

export function getAllSchedules(){
    return async function _(dispatch){
        try{
            const allDays = await getAllDailys();
            console.log({allDays});
            dispatch(setAllSchedules(allDays));
        }catch(err){
            console.error(err);
        }
    }
}

export function editTaskByDate(schedule,newTask){
    return async function _(dispatch){
        try{
            await setTask(schedule,newTask);
            console.log('here!!!');
            dispatch(getAllSchedules());
        }catch(err){
        console.error(err);
    }
}
}

export function deletedTask(schedule,task){
    return async function _(dispatch){
        try{
            await deleteTaskById(schedule,task.id);
            dispatch(getAllSchedules());
        }catch(err){
            console.log(err);
        }
    }
}

export  function deleteSchdule(schedule){
    return async function _(dispatch){
        try{
            console.log('im in store')
            await deleteDailySchedule(schedule);
            dispatch(getAllSchedules());
        }catch(err){
            console.log('im in catch')
            console.error(err);
        }
    }
}

function setDaily(daily){
    return{
        type:SET_DAILY,
        payload:daily
    }
}
export function getDailyByDate(date){
    return async function _(dispatch){
        const daily = await getDailyScheduleByDate(date);
        if(daily?.tasks?.length){
            dispatch(setDaily(daily));
        }

    }
}