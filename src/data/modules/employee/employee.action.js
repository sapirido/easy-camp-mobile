import {SET_EMPLOYEES} from './employee.types';
import {getEmployeesData} from './employee.service';
 function setEmployees(employees){
    return{
        type:SET_EMPLOYEES,
        payload:employees
    }
}

export function getEmployees(){
  return async function _(dispatch){
      try{
          const allEmployees = await getEmployeesData();
          dispatch(setEmployees(allEmployees));
      }catch(err){
          console.error(err);
      }
  }
}