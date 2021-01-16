import { getUser, login as firebaseLogin, saveUser,loginEmployee,loginParent } from '../../../fb';
import _ from 'lodash';
export async function login() {
  return firebaseLogin();
}

export async function getUserAndUpdateFromDB(userData){
  try{
    const user =  await getUser(userData.id);
    if(!user) return null;
    if(user.photoURL) return user;
      saveUser(_.merge(user,userData));
     return _.merge(user,userData);
  }catch(err){
    console.log(err);
  }
}

export async function getUserById(id){
  try{
    return await getUser(id);
  }catch(err){
    console.log(err);
  }
}

export async function employeeLogin(email,password){

  const employee = await loginEmployee(email,password);
  if(employee){
    localStorage.setItem('activeUser',JSON.stringify(employee));
    localStorage.setItem('expired',+new Date());
    return employee;
  }
   alert('המשתמש לא קיים במערכת');
} 

export async function parentLogin(childId,password){
  const parent = await loginParent(childId,password);
  if(parent){
    localStorage.setItem('activeUser',JSON.stringify(parent));
    localStorage.setItem('expired',+new Date());
    return parent;
  }
  alert('המשתמש קיים במערכת');

}