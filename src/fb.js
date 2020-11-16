import firebase from 'firebase';
import store from '../src/data/store';
import {setActiveUser} from './data/modules/auth/auth.actions'
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


