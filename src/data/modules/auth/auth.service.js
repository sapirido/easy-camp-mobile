import axios from "axios";
import get from "lodash/get";
import { login as firebaseLogin, getUser,saveUser } from '../../../fb';
//! PLOP_APPEND_SERVICE

export async function login() {
  return firebaseLogin();
}

export async function getUserAndUpdateFromDB(userData){
  try{
    const user =  await getUser(userData.uid);
    if(user) return user;
     await saveUser(userData);
     return await getUser(userData.uid);
  }catch(err){
    console.log(err);
  }
}

export async function getUserById(uid){
  try{
    return await getUser(uid);
  }catch(err){
    console.log(err);
  }
}