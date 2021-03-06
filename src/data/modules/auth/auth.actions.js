import {
  login, getUserAndUpdateFromDB, getUserById,employeeLogin,parentLogin,createParentUser,getParent,changePassword
} from "./auth.service";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  UPDATE_ACTIVE_USER,
  SET_OLD_PASS
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

export function registerParent(parentData){
  return async function _(dispatch){
    parentData = {
      ...parentData,
    }
    const parent = await createParentUser(parentData);
    if(parent){
      const parentObj = await getParent(parentData.childId);
      if(!!parentObj){
        localStorage.setItem('loggedIn',+new Date());
        localStorage.setItem('uid',parentObj.childId);
        dispatch(setActiveUser(parentObj));
      }
    }
  }
}

export function setActiveUser(user){
return{
  type:UPDATE_ACTIVE_USER,
  payload:user
 }
}

export function setOldPassword(password){
  return{
    type:SET_OLD_PASS,
    payload:password
  }
}

export function onEmployeeLogin(email,password){
  return async function _(dispatch){
    try{
      const employee = await employeeLogin(email,password);
      dispatch(setActiveUser(employee));
      dispatch(setOldPassword(password));
    }catch(err){
      throw err;
    }
  }
}

export function onParentLogin(childId,password){
  return async function _(dispatch){
    const parent = await parentLogin(childId,password);
    if(!!parent){
      dispatch(setActiveUser(parent));
      return true;
    }
  }
}

export function updatePassword(oldPassword,newPassword,user){
  return async function _(dispatch){
    try{

      const updatedUser = await changePassword(oldPassword,newPassword,user);
      dispatch(setActiveUser(updatedUser));
      localStorage.setItem('activeUser',JSON.stringify(updatedUser));
      return updatedUser;
    }catch(err){
      throw err;
    }
  }
}