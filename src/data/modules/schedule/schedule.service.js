import {storeDailySchedule,getAllSchedule} from '../../../fb';

export  async function createDailySchedule(dailySchedule){
    return await storeDailySchedule(dailySchedule);
}

export async function getAllDailys(){
    return await getAllSchedule();
}