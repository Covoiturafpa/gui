import { Navigate } from 'react-router-dom';
import { api } from '../config/api';
import { useSetLogin } from './UserLogin';

class AuthService {

  async login(username, password) {
    let textResult;
    if(localStorage.getItem('user')) {
      textResult = localStorage.getItem('user');
    }else if(sessionStorage.getItem('user')){
      textResult = sessionStorage.getItem('user');
    }else {
      try {
        await fetch(api + "/login", {
          method: "POST",
          body: JSON.stringify({ "username": username, "password": password })
        }).then((response) => {
          return response.json();
        }).then((text) => {
          textResult = text;
        });
      } catch(error) {
        console.error(error);
        return {"errorMessage" : error.message };
      }
    }
    return textResult
  }

  logout() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem("user");
    }
    if(sessionStorage.getItem('user')) {
      sessionStorage.removeItem("user");
    }
    
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();

/**
 * (response) => {
              this.props.history.push("/rechercher");
              const jsonData = JSON.stringify(response.data);
              setState(jsonData)
              window.location.reload();
              },
              error => {
              const resMessage =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                  this.setState({
                      loading: false,
                      message: resMessage
                  });
              }
 */