import {SET_EMPLOYEES, SET_SELECTED_EMPLOYEE} from './employee.types';
import {getEmployeesData,getEmployeeById} from './employee.service';
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

export function setSelectedEmployee(employee){

    return{
        type:SET_SELECTED_EMPLOYEE,
        payload:employee
    }
}

export function setSelectedEmployeeById(employeeId){
    return async function _(dispatch){
        try{
            const employee = await getEmployeeById(employeeId);
            dispatch(setSelectedEmployee(employee));
        }catch(err){
            console.error(err);
        }
    }
}