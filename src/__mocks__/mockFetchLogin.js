async function mockFetchNotOkLogin() {
    return { ok: true, status: 200, json: () => Promise.resolve({ errorMessage: "Message d'erreur" }) };
}

async function mockFetchOkLogin() {
    return { ok: true, status: 200, json: () => Promise.resolve({ userId: "username", 
                                                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", 
                                                                role: ["ROLE_ADMIN", "ROLE_USER"] }) };
}

export { mockFetchOkLogin, mockFetchNotOkLogin };