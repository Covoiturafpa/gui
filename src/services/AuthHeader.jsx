export default function authHeader() {
    let user;
    let header = new Headers();
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        console.log("LocalStorage user token:", user.token);
        header.set('Authorization', 'Bearer ' + user.token);
        return header;
    } else if (sessionStorage.getItem('user')) {
        user = JSON.parse(sessionStorage.getItem('user'));
        console.log("SessionStorage user token:", user.token);
        header.set('Authorization', 'Bearer ' + user.token);
        return header;
    } else {
        console.warn("Aucun user trouvé dans le stockage");
        return header;
    }
}
