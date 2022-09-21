import {React, useState} from 'react';
import { Form, ButtonToolbar, Button, Checkbox } from 'rsuite';
import AuthService from "../services/AuthService";
import { useSetState, useTrackedState } from "../services/UserToken";
import { loginFormSchema, newEmailFormSchema } from '../services/SchemaType';

const LoginForm = () => {
    const setState = useSetState();
    const state = useTrackedState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function usernameChangeHundler(newUsername) {
        setUsername(newUsername);
        //setState((prev) => ({ ...prev, "username" : e }));
    };

    function passwordChangeHundler(newPassword) {
        setPassword(newPassword);
        //setState((prev) => ({ ...prev, "password" : e }));
    };

    const handleLogin = (e) => {

        console.log("username : " + username + " Password: " + password)
        console.log(AuthService.login(username, password));
            //setState(AuthService.login(state.username, state.password));

    }   
    return (
            <Form fluid checkTrigger='change' model={newEmailFormSchema}>
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