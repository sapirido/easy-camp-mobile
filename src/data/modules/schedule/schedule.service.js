import {storeDailySchedule,getAllSchedule,setTaskByDate,deleteScheduleByDate} from '../../../fb';

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

export async function deleteTaskById(schdule,taskId){
    const filteredTasks = schdule.tasks.filter(task => task.id !== taskId);
    const newSchedule ={
        ...schdule,
        tasks:filteredTasks
    }
   return await setTaskByDate(newSchedule)
}

export async function deleteDailySchedule(schduleDate){
    console.log('im in service')
    return await deleteScheduleByDate(schduleDate);
}