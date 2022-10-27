require AuthService from "../services/AuthService";

const userLogin = {
    username : "MohammadGreenfelder@mail.fr",
    password : "MohammadGreenfelder@mail.fr"
}
  
test('log in', () => {
    let result = AuthService.login(userLogin.username, userLogin.password);
    console.log("USERID : " + result.userId);
    expect(result.userId).toBe(51);
});