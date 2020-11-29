import {
  login, getUserAndUpdateFromDB, getUserById,

} from "./auth.service";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  UPDATE_ACTIVE_USER
} from "./auth.types";

//! PLOP_APPEND_ACTION

export function loginAction() {
  return async function _(dispatch) {
    const user = await login(); // modify by your logic
    return user;
  };
}

export  function verifyUser(user){
  return async function _(dispatch){
    const dbUser = await getUserAndUpdateFromDB(user);
    if(!dbUser) return null;
    localStorage.setItem('loggedIn',+new Date());
    localStorage.setItem('uid',user.id);
    dispatch(setActiveUser(dbUser));
    return dbUser;
  }
}
export function getUserSession(uid){
  return async function _(dispatch){
    const user = await getUserById(uid);
    dispatch(setActiveUser(user));
  }
}

export function setActiveUser(user){
return{
  type:UPDATE_ACTIVE_USER,
  payload:user
 }
}