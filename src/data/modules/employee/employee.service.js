import {getAllEmployees,getEmployee} from '../../../fb';
export async function getEmployeesData(){
    try{
        return await getAllEmployees();
    }catch(err){
        console.error(err);
    }
}

export async function getEmployeeById(employeeId){
    try{
        return await getEmployee(employeeId);
    }catch(err){

    }
}