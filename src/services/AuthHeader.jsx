export default function authHeader() {
  let user;
  let header = new Headers();
  header.set('Content-Type', 'application/json');
    if(localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'));
      header.set('Authorization', 'Bearer ' + user.token); 
      return header;

    }else if(sessionStorage.getItem('user')) {
      user = JSON.parse(sessionStorage.getItem('user'));
      header.set('Authorization', 'Bearer ' + user.token); 
      return header;
    }else {
      return header;
    }
}