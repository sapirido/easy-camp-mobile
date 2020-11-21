import {saveCamp,saveEmpolyee,saveChildren} from '../../../fb';

export async function storeCamp(camp){

    const employees = [camp.camp_manager,...camp.instructions];
    const childrens = [...camp.groups.map(group=>group.childrens)]
    let allChildrens = [];
    childrens.forEach(childrenGroup=>{
        allChildrens = [...allChildrens,...childrenGroup];
    })
    console.log(childrens);
    try{
    employees.forEach(employee=>{
        saveEmpolyee(employee);
    })
    allChildrens.forEach(children=>{
        saveChildren(children);
    })
    saveCamp(camp);
    }catch(err){
        console.error(err);
    }
}