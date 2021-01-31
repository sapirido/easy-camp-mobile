

 function checkSession(){
    const expired = localStorage.getItem('expired');
    const now = +new Date();
    return now - Number(expired) < 3 * 60 * 60 * 1000;
  }

export function checkActiveUser(activeUser){
    let user = activeUser;
    if(!user && checkSession()){
        user = localStorage.getItem('activeUser');
      }
      if(!checkSession()){
        localStorage.removeItem('activeUser');
      }
      if(user){
        user = JSON.parse(user);
        return user;
      }
    return false;
}
