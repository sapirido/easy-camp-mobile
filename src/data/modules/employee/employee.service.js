import {getAllEmployees} from '../../../fb';
export async function getEmployeesData(){
    try{
        const allEmployees = await getAllEmployees();
        return allEmployees;
    }catch(err){
        console.error(err);
    }
}