import React from 'react';
import { Form, ButtonToolbar, Button, Grid, Col, Row, Checkbox, CheckboxGroup, DateRangePicker, RadioGroup, Radio } from 'rsuite';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import FormControlLabel from 'rsuite/esm/FormControlLabel';
import FormControl from 'rsuite/esm/FormControl';



const RegistrationForm = () => {

    function onVerifyCaptcha (token) {
        console.log("Verified: " + token);
    }

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
                            <Form.Group controlId="personType">
                                <RadioGroup name="personType" inline>
                                    <Radio value="T" checked={true} defaultChecked={true}>Stagiaire</Radio>
                                    <Radio value="E">Employé.e</Radio>
                                </RadioGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="service">
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="periodActivity">
                                <FormControlLabel>Période d'activité</FormControlLabel>
                                <FormControl name="dateRangePicker" accepter={DateRangePicker}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Row>
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
                        <Col xs={24}>
                            <Form.Group>
                                <CheckboxGroup name="checkboxList"> 
                                    <p>Préférences de contact :</p>
                                    <Checkbox value="contactBySMS" defaultChecked>Autoriser l'envoi de SMS</Checkbox>
                                    <Checkbox value="contactByMail" defaultChecked>Autoriser l'envoi d'email</Checkbox>
                                </CheckboxGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="GCUAgreement">
                                <Checkbox value="gcuAgreement">J'ai pris connaissance et j'accepte les Conditions Générales d'Utilisation de Covoitur'AFPA.</Checkbox>
                            </Form.Group>
                        </Col>
                        <Col xs={24}>
                            <Form.Group controlId="captcha">
                                <HCaptcha sitekey="aea49a3b-1ae7-4709-996d-b4bc374a903c" onVerify={onVerifyCaptcha}/>
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