import firebase from 'firebase';
import { update } from 'lodash';
import store from './data/store';
var firebaseConfig = {
  apiKey: "AIzaSyBjPWUKWf-m9nOdNEHV3-Q8Rn4Feu4oErI",
  authDomain: "easy-camp.firebaseapp.com",
  databaseURL: "https://easy-camp.firebaseio.com",
  projectId: "easy-camp",
  storageBucket: "easy-camp.appspot.com",
  messagingSenderId: "909149811667",
  appId: "1:909149811667:web:e0e246f09e7615d1aa7526"
};
firebase.initializeApp(firebaseConfig);


export const db = firebase.database();
export const { auth } = firebase;
export const storage = firebase.storage();


//***START_AUTH***//
const provider = new auth.GoogleAuthProvider();
export async function getUser(uid){
const userData = await db.ref(`kleah/users/${uid}`).once('value').then(snapshot =>{  
   return snapshot.val();
  });
  return userData;
}

export async function saveUser(userData){

   await db.ref(`/kleah/users/${userData.uid}`).set({
    ...userData
  })
}

export function login() {
  return auth().signInWithPopup(provider).then(async (result) => {
    const { displayName, email, photoURL, uid } = result.user;
    const authUser = { displayName, email, photoURL, uid }; 
    return authUser;
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const { email } = error;
      const { credential } = error;
      console.log(errorCode, errorMessage, email, credential);
      throw new Error();
    });
}

//***END_AUTH */

//***START_CAMP */
export async function saveEmpolyee(employee){
try{
  await db.ref(`/kleah/users/employees/${employee.id}`).set({
    ...employee
  })
}catch(err){
  console.error(err);
 }
}

export async function saveChildren(children){
  try{
    await db.ref(`/kleah/users/childrens/${children.id}`).set({
      ...children
    })
  }catch(err){
    console.error(err);
  }
}

export async function saveCamp(camp){
  try{
    await db.ref(`/kleah/camps/${camp.camp_id}`).set({
      ...camp
    })
  }catch(err){
    console.error(err);
  }
}

export async function getAllCamps(){
  try{
    const allCamps = await (await db.ref('/kleah/camps').once('value')).val();
    return allCamps.filter(Boolean);
  }catch(err){
    console.error(err);
  }
}

export async function updateCampManager(managerId,campId,updatedData){
  try{
    let updates = {};
    updates[`/kleah/camps/${campId}/camp_manager`] = updatedData;
    updates[`/kleah/users/employees/${managerId}`] = null;
    updates[`/kleah/users/employees/${updatedData.id}`] = updatedData; 
    return await db.ref().update(updates);
  }catch(err){
    console.error(err);
  }
}

export async function updateInstruction(camp,instructionId,updatedData){
  try{
    let updates = {};
    updates[`/kleah/users/employees/${instructionId}`] = null;
    updates[`/kleah/users/employees/${updatedData?.id}`] = updatedData;
    updates[`/kleah/camps/${camp.camp_id}`] = null;
    updates[`/kleah/camps/${camp.camp_id}`] = camp;
    return await db.ref().update(updates);

  }catch(err){
    console.error(err);
  }
}

export async function updateChildren(camp,childrenId,updatedData){
  try{
    let updates = {};
    updates[`/kleah/users/childrens/${childrenId}`] = null;
    updates[`kleah/users/childrens/${updatedData.id}`] = updatedData;
    updates[`kleah/camps/${camp.camp_id}`] = null;
    updates[`kleah/camps/${camp.camp_id}`] = camp;
    return await db.ref().update(updates);
  }catch(err){
    console.error(err);
    }
}
//** CAMP_END */

//** EMPLOYEE_START */

export async function getAllEmployees(){
  try{
    return await (await db.ref('/kleah/users/employees').once('value')).val();
  }catch(err){
    console.error(err);
  }
}

export async function getEmployee(employeeId){
try{
  return await (await db.ref(`/kleah/users/employees/${employeeId}`).once('value')).val();

}catch(err){
  console.error(err);
}
}



