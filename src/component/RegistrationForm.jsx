import React, { useEffect, useState } from 'react';
import { Form, ButtonToolbar, Button, Grid, Col, Row, Checkbox, CheckboxGroup, DateRangePicker, RadioGroup, Radio, SelectPicker } from 'rsuite';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import FetchService from '../services/FetchService';

const Service = (props) => {

    const [formations, setFormations] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            FetchService.get("/centre/formations").then(data => {
                setFormations(data.map(formation => ({label: formation.name, value: formation.id})));
            setIsLoaded(true);});
        }
    },[isLoaded])

    if (props.personType === "E") {
        return (
            <>
                <Form.ControlLabel>Service</Form.ControlLabel>
                <Form.Control name="service" />
            </>)
    }

    else if (!isLoaded) {
        return(<div>Chargement...</div>);
    }
    else {
        return (
            <>
                <Form.ControlLabel>Formation</Form.ControlLabel>
                <SelectPicker className='w-full' data={formations} />
            </>
        )
    }
}

const RegistrationForm = () => {

    const [personType, setPersonType] = useState("T");

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
                            <Form.Group controlId="phoneNumber">
                                <Form.ControlLabel>Tél.</Form.ControlLabel>
                                <Form.Control name="phoneNumber" type="phone" />
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="personType">
                                <RadioGroup name="personType" value={personType} inline onChange={setPersonType}>
                                    <Radio value="T">Stagiaire</Radio>
                                    <Radio value="E">Employé.e</Radio>
                                </RadioGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="service">
                                <Service personType={personType}/>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="periodActivity">
                                <Form.ControlLabel>Dates de début & de fin</Form.ControlLabel>
                                <Form.Control name="dates" accepter={DateRangePicker} className='w-full' format="yyyy-MM-dd" character={" -> "} placeholder={"aaaa-mm-jj -> aaaa-mm-jj"} showOneCalendar placement='topStart'>
                                <DateRangePicker />
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Row>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="email">
                                <Form.ControlLabel>E-mail</Form.ControlLabel>
                                <Form.Control name="email" type="email" />
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
                        <Col xs={24}>
                            <Form.Group>
                                <CheckboxGroup name="checkboxList"> 
                                    <p>Préférences de contact :</p>
                                    <Checkbox value="contactBySMS">Autoriser l'envoi de SMS</Checkbox>
                                    <Checkbox value="contactByMail">Autoriser l'envoi d'email</Checkbox>
                                </CheckboxGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={24}>
                            <hr/>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="GCUAgreement">
                                <Checkbox value="gcuAgreement">Je reconnais avoir pris connaissance et j'accepte les Conditions Générales d'Utilisation de Covoitur'AFPA.</Checkbox>
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