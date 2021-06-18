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
const currentUser = auth().currentUser;

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
    const user = await auth().signInWithEmailAndPassword(email,password);
    if(user){
      const masterCamp = localStorage.getItem('campCode');
      const campEmployees =  await (await db.ref(`/${masterCamp}/users/employees`).once('value')).val();
      
      const employees = Object.values(campEmployees);
  
      if(employees.length){
        const selectedEmployee = employees.find(employee => employee.email === email);
        return selectedEmployee;
      }
    }else{
      throw new Error('המשתמש אינו רשום במערכת');
    }
    
    return false;
  }catch(err){
   console.error('err');
   throw new Error('המשתמש אינו רשום במערכת');

  }
}

export async function updateUser(user){
  try{
    let updates = {};
    updates[`/kleah/users/employees/${user.id}`] = null;
    updates[`/kleah/users/employees/${user.id}`] = user;
    return await db.ref().update(updates);
  }catch(err){
    console.error(err);
  }
}

export async function updateUserPassword(oldPassword,newPassword,user){
  try{
    await auth().signInWithEmailAndPassword(user.email,oldPassword);
    await auth().currentUser.updatePassword(newPassword);
    const newUser = {
      ...user,
      updatedPassword:true
    }
    await updateUser(newUser);
    return newUser;

  }catch(err){
    console.error(err);
    throw err;
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

export async function getCampInstructions(campId){
  try{
    const instructions = await (await db.ref(`/kleah/camps/${campId}/instructions`).once('value')).val();
    return instructions.filter(Boolean);
  } catch(err){
    console.error('can not fetch instruction data',err);
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

export async function getCampById(campId){

  try{
    return await (await db.ref(`/kleah/camps/${campId}`).once('value')).val();
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

export async function getReportPoints(transportId){
  try{
   return await (await db.ref(`/kleah/reports/point_reports/${transportId}`).once('value')).val();
  }catch(err){
    console.error(err);
  }
}

export async function updateTransportPoint(transportId,report){
  try{
    let update = {};
    update[`/kleah/reports/point_reports/${transportId}/${report.date}`] = report;
    await db.ref().update(update);
    return report;
  } catch(err) {
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

export async function updateChildrenTransport(child,date,type){
  try{
    let update = {};
    if(type === 'collect'){
      update[`/kleah/users/childrens/${child.id}/selfTransports/${date}/collect`] = child.collect;
    }else{
      update[`/kleah/users/childrens/${child.id}/selfTransports/${date}/arrived`] = child.arrived;
    }
    return await db.ref().update(update);
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

export async function getAllTransport(){
  try{
    return await (await db.ref('/kleah/transports').once('value')).val();
  }catch(err){
    console.log(err);
  }
}

export async function checkChildrenReport(campId,groupNumber,childIndex,date){
try{
return await (await db.ref(`/kleah/camps/${campId}/groups/${groupNumber}/childrens/${childIndex}/reports/${date}`).once('value')).val();
}catch(err){
  console.error(err);
}
}

//FEEDBACK

export async function getFeedbacks(){

  return await (await db.ref('kleah/feedbacks').once('value')).val();
}

export async function storeFeedback(campId,week,childId,feedback){
let update ={};
update[`/kleah/camps/${campId}/feedbacks/${week}/${childId}`] = feedback;
return await db.ref().update(update);
}


//CONTACT

export async function getEmployeesContact(){
  try{
    return await (await db.ref('kleah/users/employees').once('value')).val();
  } catch(err){
    console.error('can not fetch employees contacts',err);
  }
}

export async function getGroupContact(campId){
  try{
    console.log({path:`/kleah/camps/${campId}/groups`})
     return await (await db.ref(`/kleah/camps/${campId}/groups`).once('value')).val();

  } catch(err){
    console.error('can not fetch group contacts',err);
  }
}

export async function getCampList(campId){
  try{
    return await (await db.ref(`/kleah/camps/${campId}/groups`).once('value')).val();
  } catch(err){
    console.error('can not fetch camp contacts',err);
  }
}

export async function getAllContact(){
  const allEmployees = await getEmployeesContact();
  const allChildren = await getChildrensContanct();
  return { ...allEmployees, ...allChildren };
}

export async function getChildrensContanct(){
  try{
   return await (await db.ref('/kleah/users/childrens').once('value')).val(); 
  } catch(err){
    console.error('can not fetch transport contacts',err);
  }
}

//attendance

export async function updateAttendance(campId,instructionId,date,childId,childIndex,attended,isGroup,selectedGroupNumber,isMorning){
console.log({isGroup,isMorning});
  try{
  let update ={};
if(isGroup){
  update[`/kleah/camps/${campId}/groups/${selectedGroupNumber}/childrens/${childIndex}/attendance/${date}/group`] = attended;
  update[`/kleah/users/childrens/${childId}/attendance/${date}/group`] = attended;
}else{
  if(isMorning){
    update[`/kleah/users/childrens/${childId}/attendance/${date}/transport/morning`] = attended;
  update[`/kleah/camps/${campId}/groups/${selectedGroupNumber}/childrens/${childIndex}/attendance/${date}/transport/morning`] = attended;

  }else{
    update[`/kleah/users/childrens/${childId}/attendance/${date}/transport/noon`] = attended;
    update[`/kleah/camps/${campId}/groups/${selectedGroupNumber}/childrens/${childIndex}/attendance/${date}/transport/noon`] = attended;

  }
}
return await db.ref().update(update);
  }catch(err){
    console.error(err);
  }
}

export async function saveChildReport(campId,groupNumber,childId,date,selectedTime,isDrink){
  try{
    let update = {};
    update[`kleah/camps/${campId}/groups/${groupNumber}/childrens/${childId}/reports/${date}/${selectedTime}/isDrinkWater`] = isDrink;
    return await db.ref().update(update);
  }catch(err){
    console.error(err);
  }
}


export async function editTask(campId,date,index,newValues){
  try{
    let updates = {};
    updates[`kleah/daily_schedules/${campId}/${date}/tasks/${index}`] = null;
    updates[`kleah/daily_schedules/${campId}/${date}/tasks/${index}`] = newValues;

    await db.ref().update(updates);
    return await getDailyByDate(campId,date);
  }catch(err){
    console.error(err);
  }
}