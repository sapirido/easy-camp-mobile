import { getUser, login as firebaseLogin, saveUser } from '../../../fb';
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