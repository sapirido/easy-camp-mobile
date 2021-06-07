import {storeDailySchedule,getAllSchedule,setTaskByDate,deleteScheduleByDate, getDailyByDate,editTask} from '../../../fb';

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

export async function deleteTaskById(schedule,taskId,campId){
    const filteredTasks = schedule.tasks.filter(task => task.id !== taskId);
    const newSchedule ={
        ...schedule,
        tasks:filteredTasks
    }
   return await setTaskByDate(newSchedule,campId)
}

export async function deleteDailySchedule(schduleDate){
    console.log('im in service')
    return await deleteScheduleByDate(schduleDate);
}

export async function getDailyScheduleByDate(campId,date){
    return await getDailyByDate(campId,date);
}

export async function updateTask(campId,date,index,newValues){
    return await editTask(campId,date,index,newValues);
}