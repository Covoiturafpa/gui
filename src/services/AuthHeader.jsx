export default function authHeader() {
  let user;
    if(localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'));
      return { Authorization:  user.token };
    }else if(sessionStorage.getItem('user')) {
      user = JSON.parse(sessionStorage.getItem('user'));
      return { Authorization:  user.token };
    }else {
      return {};
    }
}