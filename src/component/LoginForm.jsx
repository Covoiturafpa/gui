import React from 'react';
import { Form, ButtonToolbar, Button, Panel, Checkbox } from 'rsuite';

const LoginForm = () => {
    return (
        <Panel header={<h3>Login</h3>} bordered>
            <Form fluid>
                <Form.Group>
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Mot de passe</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                    <Checkbox> Se souvenir de moi</Checkbox>
                    <link></link>
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary">Connexion</Button>
                        <Button appearance="link">Mot de passe oublié?</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </Panel>
    )
}

export { LoginForm };