import React from 'react';
import { Form, ButtonToolbar, Button, Grid, Col, Row, Checkbox, CheckboxGroup, Placeholder } from 'rsuite';
import { AvatarUploader } from './AvatarUploader';



const RegistrationForm = () => {

    return (
        <Form fluid className='w-full'>
            <Grid fluid>
                <Col xs={24} md={12}>
                    <Row>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="surname">
                                <Form.ControlLabel>Nom</Form.ControlLabel>
                                <Form.Control name="surname" />
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="firstname">
                                <Form.ControlLabel>Prénom</Form.ControlLabel>
                                <Form.Control name="firstname" />
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="email">
                                <Form.ControlLabel>E-mail</Form.ControlLabel>
                                <Form.Control name="email" type="email" />
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="phoneNumber">
                                <Form.ControlLabel>Tél.</Form.ControlLabel>
                                <Form.Control name="phoneNumber" type="phone" />
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="password">
                                <Form.ControlLabel>Mot de passe</Form.ControlLabel>
                                <Form.Control name="password" type="password" autoComplete="off" />
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="passwordConfirm">
                                <Form.ControlLabel>Confirmer le mot de passe</Form.ControlLabel>
                                <Form.Control name="passwordConfirm" type="password" autoComplete="off" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Row>
                        <Col xs={24}>
                            <Form.Group controlId="avatar">
                                <Form.ControlLabel>Image de profil</Form.ControlLabel>
                                <AvatarUploader />
                            </Form.Group>
                        </Col>
                        <Col xs={24}>
                            <Form.Group>
                                <CheckboxGroup name="checkboxList"> 
                                    <p>Préférences de contact</p>
                                    <Checkbox value="contactBySMS" defaultChecked>Autoriser l'envoi de SMS</Checkbox>
                                    <Checkbox value="contactByMail" defaultChecked>Autoriser l'envoi d'email</Checkbox>
                                </CheckboxGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={24}>
                            <Form.Group controlId="captcha">
                                <Placeholder.Paragraph style={{ marginTop: 30 }} graph="circle" className='border-2 border-black-800' />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24}>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button appearance="primary">S'inscrire</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Col>
            </Grid>
        </Form>
    );
}

export { RegistrationForm };