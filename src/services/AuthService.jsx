import FetchService from './FetchService';

class AuthService {

  /**
   * @returns succès :  {username:"", token:"", password:""}, échec : { errorMessage: "Message d'erreur" }
   * TODO: Mettre à jour last_login
   */
  async login(username, password) {
    // Si les informations utilisateur ne sont pas en LocalStorage ("option "Se souvenir de moi")
    // ou en session storage (navigation classique)
    // requêtage du endPoint login
    let textResult = localStorage.getItem('user'); // null / undefined -> falsy
    if (!textResult) {
      textResult = sessionStorage.getItem('user');
    }
    
    if (!textResult) {
      try {
        await fetch(FetchService.urlApi + "/api/authentication/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ "username": username, "password": password })
        }).then((response) => {
          return response.json(); //  { userId: "username", token: "eazezaeza33213azezajkjj", role: "[...]"}
        }).then((text) => {
          textResult = text;
        });
      } catch(error) {
        // console.error(error);
        return {"errorMessage" : error.message };
      }
    }
    return textResult;
  }

  logout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem("user");
    }
    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem("user");
    }
  }

  getCurrentUserId() {
    let userId;
    if (localStorage.getItem('user')) {
      userId = JSON.parse(localStorage.getItem('user')).userId;
    } 
    if (sessionStorage.getItem('user')) {
      userId = JSON.parse(sessionStorage.getItem('user')).userId;
    }
    return userId;
  }
}

export default new AuthService();
