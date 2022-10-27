/**
 * @jest-environment jsdom
 */

import AuthService from "../services/AuthService";

const userLogin = {
    username: "MohammadGreenfelder@mail.fr",
    password: "6sjngbrc3t1tigidn826"
}

test('log in', async () => {
    window.localStorage.clear();
    let result = await AuthService.login(userLogin.username, userLogin.password);
    console.log(result)
    expect(result.id).toBe("51")
});

test('basic', () => {
    expect(1).toBe(1);
});

