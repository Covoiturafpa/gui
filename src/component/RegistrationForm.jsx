import React from 'react';
import { Form, ButtonToolbar, Button, Panel, Grid, Row, Col, Checkbox, CheckboxGroup, Placeholder } from 'rsuite';
import { AvatarUploader } from './AvatarUploader';

const RegistrationForm = () => {
    return (
        <Panel header={<h3>Inscription</h3>} bordered>
            <Form fluid='true'>
                <Grid>
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="surname">
                                <Form.ControlLabel>Nom</Form.ControlLabel>
                                <Form.Control name="surname" />
                            </Form.Group>
                            <Form.Group controlId="firstname">
                                <Form.ControlLabel>Prénom</Form.ControlLabel>
                                <Form.Control name="firstname" />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.ControlLabel>Email</Form.ControlLabel>
                                <Form.Control name="email" type="email" />
                            </Form.Group>
                            <Form.Group controlId="phoneNumber">
                                <Form.ControlLabel>Tel</Form.ControlLabel>
                                <Form.Control name="phoneNumber" type="phone" />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.ControlLabel>Mot de passe</Form.ControlLabel>
                                <Form.Control name="password" type="password" autoComplete="off" />
                            </Form.Group>
                            <Form.Group controlId="passwordConfirm">
                                <Form.ControlLabel>Confirmation mot de passe</Form.ControlLabel>
                                <Form.Control name="passwordConfirm" type="password" autoComplete="off" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="avatar">
                                <AvatarUploader />
                                
                            </Form.Group>
                            <Form.Group>
                                <CheckboxGroup name="checkboxList">
                                    <p>Préférences de contact</p>
                                    <Checkbox value="contactBySMS" defaultChecked>Autoriser l'envoi de SMS</Checkbox>
                                    <Checkbox value="contactByMail" defaultChecked>Autoriser l'envoi d'email</Checkbox>
                                </CheckboxGroup>
                            </Form.Group>
                            <Form.Group controlId="avatar">
                                <Placeholder.Paragraph style={{ marginTop: 30 }} graph="circle" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <ButtonToolbar>
                                    <Button appearance="primary">Submit</Button>
                                    <Button appearance="default">Cancel</Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </Col>
                    </Row>
                </Grid>


            </Form>
        </Panel>
    );
}

export { RegistrationForm };