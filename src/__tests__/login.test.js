import AuthService from "../services/AuthService";

const userLogin = {
    username : "MohammadGreenfelder@mail.fr",
    password : "6sjngbrc3t1tigidn826"
}
  
test('log in', () => {
    let result = AuthService.login(userLogin.username, userLogin.password);
    let id = result.then((res) => res.userId);
    expect(id).toBe(51);
});

test('basic', () => {
    expect(1).toBe(1);
});