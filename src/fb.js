import firebase from 'firebase';
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
export async function getUser(id){
const userData = await db.ref(`kleah/users/employees/${id}`).once('value').then(snapshot =>{
   return snapshot.val();
  });
  return userData;
}

export async function saveUser(userData){

   await db.ref(`/kleah/users/employees/${userData.id}`).set({
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

function loginParentWithEmailAndPassword(email,password){
  return auth().signInWithEmailAndPassword(email,password);
}

export async function loginEmployee(email,password){
  try{
    const masterCamp = localStorage.getItem('campCode');
    const campEmployees =  await (await db.ref(`/${masterCamp}/users/employees`).once('value')).val();

    console.log(masterCamp)
    console.log(campEmployees)
    const employees = Object.values(campEmployees);
    console.log(employees)
    if(employees.length){
      const selectedEmployee = employees.find(employee => employee.email === email);
      return selectedEmployee;
    }
    return false;
  }catch(err){
    console.error(err);
  }
}

export async function getChildById(childId){
  try{
    const masterCamp = localStorage.getItem('campCode');
    const child = await (await db.ref(`/${masterCamp}/users/childrens/${childId}`).once('value')).val();
    return !!child && child;
  }catch(err){
    console.log(err);
  }
}

export async function registerParent(parent){
  const {email,password} = parent;
  const masterCamp = localStorage.getItem('campCode');
  await auth().createUserWithEmailAndPassword(email,password);
  await  db.ref(`/${masterCamp}/users/parents/${parent.childId}`).set({
    email:parent.email,
    name:parent.name,
    childId:parent.childId,
    type:parent.type,
    campId:parent.campId
  }
  )
return true;
}

export async function loginParent(childId,password){
  const masterCamp = localStorage.getItem('campCode');
  const parent = await (await db.ref(`/${masterCamp}/users/parents/${childId}`).once('value')).val();
  if(!!parent){
    loginParentWithEmailAndPassword(parent.email,password);
    return parent;
  }else{
    return false;
  }
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

export async function getParentByChildId(childId){
  try{
    const masterCamp = localStorage.getItem('campCode');
    return await (await db.ref(`/${masterCamp}/users/parents/${childId}`).once('value')).val();
  } catch(err) {
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

//**EMPLOYEE_END */

//**SCHEDULE_START */
export async function storeDailySchedule(dailySchedule){
  try{
    await db.ref(`/kleah/daily_schedules/${dailySchedule.date}`).set({
      ...dailySchedule
    })
  }catch(err){
    console.error(err);
  }
}

export async function getAllSchedule(campId){
  try{
    return await (await db.ref(`/kleah/daily_schedules/${campId}`).once('value')).val();
  }catch(err){
    console.error(err);
  }
}

export async function getDailyByDate(campId,date){
  try{
    const masterCamp = localStorage.getItem('masterCamp') || 'kleah';
    return await (await db.ref(`/${masterCamp}/daily_schedules/${campId}/${date}`).once('value')).val();
  }catch(err){
    console.error(err);
  }
}

export async function setTaskByDate(schedule,campId){
  try{
    let updates = {};
    updates[`/kleah/daily_schedules/${campId}/${schedule.date}`] = null;
    updates[`/kleah/daily_schedules/${campId}/${schedule.date}`] = schedule;
    return await db.ref().update(updates);
  }catch(err){
    console.error(err);
  }
}

export async function deleteScheduleByDate(scheduleDate){
  try{
    console.log('im in fb');
    let updates = {};
    updates[`/kleah/daily_schedules/${scheduleDate}`] = null;
    return await db.ref().update(updates);
    }catch(err){
      console.error(err);
    }
}

//**SCHEDULE_END */
//**REPORT_START */
export async function addReportPoint(report){
  try{
    let update = {}
    update[`/kleah/reports/point_reports/${report.date}`] = report;
    console.log({update})
    return await db.ref().update(update);
  }catch(err){
    console.error(err);
  }
};

export async function getReportPoints(){
  try{
   return await (await db.ref('/kleah/reports/point_reports').once('value')).val();
  }catch(err){
    console.error(err);
  }
}

export async function removeReportPoint(date){
  try{
    let update = {}
    update[`/kleah/reports/point_reports/${date}`] = null;
    return await db.ref().update(update);
  }catch(err){
    console.error(err);
  }
}

export async function addParentReport(instructionId,report){
  try{
    let update = {};
    update[`/kleah/reports/parent_reports/${instructionId}/${report.date}/${report.id}`] = report;
    return await db.ref().update(update);
  }catch(err){
    console.error(err);
  }
}

export async function getParentReportById(instructionId){
  try{
    return await (await db.ref(`/kleah/reports/parent_reports/${instructionId}`).once('value')).val();
  }catch(err){
    console.error(err);
  }
}


//MASTER_CAMP

export async function getMasterCamps(){
  try{
    return await (await db.ref('/camps').once('value')).val();
  }catch(err){
    console.error(err);
  }
}

