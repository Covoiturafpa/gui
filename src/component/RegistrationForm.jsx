import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonToolbar, Checkbox, Col, DateRangePicker, Form, Grid, Radio, RadioGroup, Row, SelectPicker, toaster } from 'rsuite';
import FetchService from '../services/FetchService';
import { newUserFormSchema } from '../services/SchemaType';
import { ToastMessage } from './ToastMessage';

const Formation = (props) => {

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
        return (<></>);
    }

    else if (!isLoaded) {
        return(<div>Chargement...</div>);
    }
    else {
        return (
            <>
                <Form.ControlLabel>Formation</Form.ControlLabel>
                <SelectPicker className='w-full' data={formations} onChange={props.onChange}/>
            </>
        );
    }
}

const RegistrationForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [surname, setSurname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [contactBySms, setContactBySms] = useState(false);
    const [contactByMail, setContactByMail] = useState(false);
    const [period, setPeriod] = useState([]);
    const [idFormation, setIdFormation] = useState(0);
    const [personType, setPersonType] = useState("T");
    const [captchaToken, setCaptchaToken] = useState({});
    const [submitNotActivated, setSubmitNotActivated] = useState(true);
    const [gcuAgreement, setGcuAgreement] = useState(false);

    const captchaRef = useRef();

    const handleCaptchaVerification = (token) => {
        setCaptchaToken({token: token});
        setSubmitNotActivated(false);
      }
    
    const handleCaptchaError = (error) => {
        console.log("HCaptcha [onError]:", error);
    };
    
    const handleCaptchaChallengeExpired = () => {
        console.log("HCaptcha [onChalExpired]: The user display of a challenge times out with no answer.");
    };

    const handleRegistration = () => {
        let creationRequestBody = {newPerson: getNewUser(), captchaToken: captchaToken};
        console.log(creationRequestBody);
        setSubmitNotActivated(true);
        try {
            FetchService.post("/users", JSON.stringify(creationRequestBody)).then((data) => {
                console.log(data);
                if (data.hasOwnProperty("error")) {
                    const toast = toaster.push(<ToastMessage type={"error"} header={"Erreur lors de l'inscription"} content={"L'inscription a échouée. Veuillez recommencer."} />, {value: "topCenter"});
                    setTimeout(() => {
                        toaster.remove(toast);
                    }, 3000);
                }
                else {

                }
            });
        }
        catch(error) { 
            console.log(error);
            const toast = toaster.push(<ToastMessage type={"error"} header={"Erreur"} content={"L'inscription a échouée. Veuillez recommencer."} />, {value: "topCenter"});
            setTimeout(() => {
                toaster.remove(toast);
            }, 3000);
        }
    }

    function getNewUser() {
        return (
            {
                email: email,
                password: password,
                surname: surname,
                firstName: firstName,
                phoneNumber: phoneNumber,
                contactBySms: contactBySms,
                contactByMail: contactByMail,
                startActivity: period[0],
                endActivity: period[1],
                formation: {id: idFormation},
                personType: personType
            }
        )
    }

    let fonction = (event) => {
        const valeur = event.target.value;
        setPasswordConfirm({password: password, passwordConfirm: valeur});
    }

    return (
        <Form fluid className='w-full' model={newUserFormSchema}>
            <Grid fluid>
                <Col xs={24} md={12}>
                    <Row>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="surname">
                                <Form.ControlLabel>Nom</Form.ControlLabel>
                                <Form.Control name="surname" onChange={setSurname}/>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="firstname">
                                <Form.ControlLabel>Prénom</Form.ControlLabel>
                                <Form.Control name="firstname" onChange={setFirstName}/>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="phoneNumber">
                                <Form.ControlLabel>Tél.</Form.ControlLabel>
                                <Form.Control name="phoneNumber" type="phone" onChange={setPhoneNumber}/>
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
                            <Form.Group controlId="formation">
                                <Formation personType={personType} onChange={setIdFormation}/>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="periodActivity">
                                <Form.ControlLabel>Dates de début & de fin</Form.ControlLabel>
                                <Form.Control name="dates" accepter={DateRangePicker} className='w-full' format="yyyy-MM-dd" character={" -> "} placeholder={"aaaa-mm-jj -> aaaa-mm-jj"} showOneCalendar placement='topStart' onChange={setPeriod}>
                                <DateRangePicker />
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="email">
                                <Form.ControlLabel>E-mail</Form.ControlLabel>
                                <Form.Control name="email" type="email" onChange={setEmail} checkAsync/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Row>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="password">
                                <Form.ControlLabel>Mot de passe</Form.ControlLabel>
                                <Form.Control name="password" type="password" value={password} autoComplete="off" onChange={setPassword}/>
                            </Form.Group>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="passwordConfirm">
                                <Form.ControlLabel>Confirmer le mot de passe</Form.ControlLabel>
                                <Form.Control name="passwordConfirm" type="password" value={passwordConfirm} autoComplete="off" onChange={fonction}/>
                            </Form.Group>
                        </Col>
                        <Col xs={24}>
                            <Form.Group>
                                    <p>Préférences de contact :</p>
                                    <Checkbox name="contactByMail" value={contactBySms} onChange={(value, checked) => {setContactByMail(checked)}}>Autoriser l'envoi d'emails</Checkbox>
                                    <Checkbox name="contactBySms" value={contactByMail} onChange={(value, checked) => {setContactBySms(checked)}}>Autoriser l'envoi de SMS</Checkbox>
                            </Form.Group>
                        </Col>
                        <Col xs={24}>
                            <hr/>
                        </Col>
                        <Col xs={24} className="mb-2">
                            <Form.Group controlId="GCUAgreement">
                                <Checkbox value={gcuAgreement} onChange={(value, checked) => {setGcuAgreement(checked)}}>Je reconnais avoir pris connaissance et j'accepte les Conditions Générales d'Utilisation de Covoitur'AFPA.</Checkbox>
                            </Form.Group>
                        </Col>
                        <Col xs={24}>
                            <Form.Group controlId="captcha">
                                <HCaptcha ref={captchaRef} sitekey="aea49a3b-1ae7-4709-996d-b4bc374a903c" theme="light" onVerify={handleCaptchaVerification} onError={handleCaptchaError} onChalExpired={handleCaptchaChallengeExpired}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} xsOffset={9}>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button appearance="primary" onClick={handleRegistration} disabled={submitNotActivated} id="submitButton">S'inscrire</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Col>
            </Grid>
        </Form>
    );
}

export { RegistrationForm };
