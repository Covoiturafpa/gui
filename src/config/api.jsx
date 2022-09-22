const api = "http://127.0.0.1:8443";

const connectedUser = {"id":57,"email":"CristopherWolf@mail.fr","password":"movlejxx6c3fpybxlw6o","surname":"Weber","firstName":"Casper","phoneNumber":"+33511397860","isActivated":false,"contactBySms":true,"contactByMail":true,"lastLogin":"2022-01-01T00:00:00","userType":"E","notifications":[{"id":5,"type":"ACCEPTED_RESERVATION","createdTime":"2022-01-01T00:00:00","isUnread":false,"content":"Bonjour, ACCEPTED_RESERVATION vient d’accepter votre demande de trajet. Bon covoiturage !"}],"cars":[],"role":"administration","isAdmin":true,"isTeacher":true,"startContract":"2022-01-01","endContract":"2022-01-01","authorities":[{"authority":"ROLE_USER"},{"authority":"ROLE_TEACHER"}],"enabled":false,"username":"CristopherWolf@mail.fr","accountNonLocked":true,"accountNonExpired":true,"credentialsNonExpired":true};

const userToken = "t0k3n2D3v";

export { api, connectedUser, userToken };