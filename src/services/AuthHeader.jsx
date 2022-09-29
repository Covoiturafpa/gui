export default function authHeader() {
  let user;
    if(localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'));
      let header = new Headers();
      header.set('Authorization', 'Bearer ' + user.token); 
      header.set('Content-Type', 'application/json'); 
      return header;

    }else if(sessionStorage.getItem('user')) {
      user = JSON.parse(sessionStorage.getItem('user'));
      let header = new Headers();
      header.set('Authorization', 'Bearer ' + user.token); 
      header.set('Content-Type', 'application/json'); 
      return header;
    }else {
      return {};
    }
}