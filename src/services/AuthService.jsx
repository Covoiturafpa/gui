import axios from "axios";
import { api } from '../config/api';

const headerssss = {
      "Access-Control-Allow-Origin" : "true",
      "Access-Control-Allow-Methods" : "POST, GET, PUT, PATCH",
      "Access-Control-Allow-Headers" : "Content-Type, Origin, Accept Authorization, Content-Length",
      "Content-Type" : "application/json, text/plain"

}

class AuthService {


    login(username, password) {
      return axios
        .post(api + "/login", {
          username,
          password
        }, {
          headers: headerssss
        })
        .then(response => {
          if(response.ok) {
            return JSON.stringify(response.data);
          }else {
            return "Email ou mot de passe erroné";
          }
        })
        .catch((error) => {
          console.log("error : " + error);
        });
    }
  
    /*logout() {
      localStorage.removeItem("token");
    }*/
  

  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
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