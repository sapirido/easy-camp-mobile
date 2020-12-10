import {storeDailySchedule,getAllSchedule,setTaskByDate} from '../../../fb';

export  async function createDailySchedule(dailySchedule){
    return await storeDailySchedule(dailySchedule);
}

export async function getAllDailys(){
    return await getAllSchedule();
}
export async function setTask(schedule,newTask){

    const schduleTasks = schedule.tasks.map(task => task.id === newTask.id ? {...newTask} : {...task});
    const newSchedule ={
        ...schedule,
        tasks:schduleTasks
    } 
    return await setTaskByDate(newSchedule);
}