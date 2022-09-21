import axios from "axios";
import { api } from '../config/api';

const headerssss = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  "Content-Type": "text/plain"
}

class AuthService {
  async login(username, password) {

    await fetch(api + "/login", {
      method: "POST",
      body: JSON.stringify({ "username": username, "password": password })
    }).then((response) => {
      console.log("En-tête obtenue du serveur");
      return response.text();
    }).then((text) => {
      console.log("Donnée obtenue du serveur : " + text);
    });

    /*
    responseTest.then((result) => {
      console.log("En-tête obtenue du serveur");
      return result.body();
    }).then((text) => {
      console.log("Donnée obtenue du serveur : " + text);
    });*/

    /*
    console.log("++++++++++++++++++ URL : " + api + "/login")
    const response = await fetch(api + "/login", {
      method: "POST",
      headers: headerssss,
      body: JSON.stringify({ "username": username, "password": password })  
    });
    
    const jsonResponse = await response.json();
    jsonResponse.then((result) => {
        // Succès si seconde promesse (celle du résutlat) est complète (okay)
        console.log("Result json:" + result.json())
        if (result.ok) {
          return JSON.stringify(result.data);
        } else {
          return "Email ou mot de passe erroné";
        }
      }).catch((error) => {
          console.log("Error : " + error);
          return "Erreur lors du requêtage";
      });*/
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