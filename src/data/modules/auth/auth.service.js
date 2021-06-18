import { getUser, login as firebaseLogin, saveUser,loginEmployee,loginParent,getChildById,registerParent,getParentByChildId,updateUserPassword} from '../../../fb';
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

  try{
    const employee = await loginEmployee(email,password);
    if(employee){
      localStorage.setItem('activeUser',JSON.stringify(employee));
      localStorage.setItem('expired',+new Date());
      return employee;
    }
  }catch(err){
    throw err;
  }
} 

export async function parentLogin(childId,password){
  const parent = await loginParent(childId,password);
  if(parent){
    localStorage.setItem('activeUser',JSON.stringify(parent));
    localStorage.setItem('expired',+new Date());
    return parent;
  }
}

export async function createParentUser(parent){
  const { childId } = parent;
  const child =  await getChildById(childId);
  if(!child) return false;
  console.log({child});
  const parentObject = {...parent,campId:child.campId};
  const parentRegistered = await registerParent(parentObject);
  return parentRegistered;
}

export async function getParent(childId){
try {
  return await getParentByChildId(childId);
  } catch(err){
    console.error(err);
  }
}

export async function changePassword(oldPassword,newPassword,user){
  try{

    return await updateUserPassword(oldPassword,newPassword,user);
  }catch(err){
    throw err
  }
}

