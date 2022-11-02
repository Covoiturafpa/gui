import React, { useState, useRef } from 'react';
import { Form, ButtonToolbar, Button, Checkbox } from 'rsuite';
import AuthService from "../services/AuthService";
import { loginFormSchema } from '../services/SchemaType';
import { useNavigate } from 'react-router-dom';
import { useSetLogin } from '../services/UserLogin';
import { useEffect } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const setLogin = useSetLogin();
    const navigate = useNavigate();
    const rememberMeRef = useRef();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setLogin(JSON.parse(localStorage.getItem('user')));
            navigate("/accueil");
        }
        if (sessionStorage.getItem('user')) {
            setLogin(JSON.parse(sessionStorage.getItem('user')));
            navigate("/accueil");
        }
    }, []);

    function usernameChangeHandler(newUsername) {
        setUsername(newUsername);
    };

    function passwordChangeHandler(newPassword) {
        setPassword(newPassword);
    };

    function sendToRegistration() {
        navigate("/inscription");
    }

    const handleLogin = (e) => {
        const stringResult = AuthService.login(username, password);
        
        stringResult.then((res) => {
            if (res.hasOwnProperty("errorMessage")) {
                setErrorMessage("Une erreur est survenue");
            } else if (res.hasOwnProperty("token")) {
                const newToken = res.token;
                const roles = res.roles;
                const resultLogin = {
                    "token": newToken,
                    "userId": res.userId,
                    "roles": roles
                }
                if (rememberMeRef.current.checked) {
                    localStorage.setItem('user', JSON.stringify(resultLogin));

                } else {
                    sessionStorage.setItem('user', JSON.stringify(resultLogin));
                }
                setLogin(resultLogin);
                navigate("/accueil");
            }
        });
    }

    return (
        <Form fluid checkTrigger='change' model={loginFormSchema}>
            <Form.Group>
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" onChange={usernameChangeHandler} required />
            </Form.Group>
            <Form.Group>
                <Form.ControlLabel>Mot de passe</Form.ControlLabel>
                <Form.Control name="password" onChange={passwordChangeHandler} type="password" autoComplete="off" required />
            </Form.Group>
            <Form.Group>
                <Checkbox inputRef={rememberMeRef}>Se souvenir de moi</Checkbox>
                <link></link>
            </Form.Group>
            <div className='text-red-500 my-5'>{errorMessage}</div>
            <Form.Group>
                <ButtonToolbar>
                    <Button onClick={handleLogin} appearance="primary">Connexion</Button>
                    <Button appearance="link">Mot de passe oublié ?</Button>
                    <Button onClick={sendToRegistration} appearance="link">S'inscrire</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}

export default LoginForm;