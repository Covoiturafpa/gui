import {React, useState, useEffect} from 'react';
import { Form, ButtonToolbar, Button, Checkbox } from 'rsuite';
import AuthService from "../services/AuthService";
import { loginFormSchema} from '../services/SchemaType';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import { useSetToken, useTrackedToken } from '../services/UserToken';
import { useSetUser } from '../services/UserIdConnected';

const LoginForm = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const setToken = useSetToken();
    const stateToken = useTrackedToken();
    const setUser = useSetUser();
    let navigate = useNavigate();

    function usernameChangeHundler(newUsername) {
        setUsername(newUsername);
    };

    function passwordChangeHundler(newPassword) {
        setPassword(newPassword);
    };

    const handleLogin = (e) => {
        const stringResult = AuthService.login(username, password);
        stringResult.then((res) => {
            if(res.hasOwnProperty("errorMessage")) {
                setErrorMessage("Une erreur est survenue");
            }else if(res.hasOwnProperty("accessToken")) {
                const newToken = res.accessToken;
                setToken(newToken);
                setUser(res.id);
                navigate("/accueil");
            }
        });
    }   
    return (
            <Form fluid checkTrigger='change' model={loginFormSchema}>
                <Form.Group>
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" onChange={usernameChangeHundler} required/>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Mot de passe</Form.ControlLabel>
                    <Form.Control name="password" onChange={passwordChangeHundler} type="password" autoComplete="off" required/>
                </Form.Group>
                <Form.Group>
                    <Checkbox>Se souvenir de moi</Checkbox>
                    <link></link>
                </Form.Group>
                <div className='text-red-500 my-5'>{errorMessage}</div>
                <Form.Group>
                    <ButtonToolbar>
                        <Button onClick={handleLogin} appearance="primary">Connexion</Button>
                        <Button appearance="link">Mot de passe oublié?</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
    )
}

export { LoginForm };