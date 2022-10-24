import React, { useEffect, useState, useRef } from 'react';
import { Button, Checkbox, Col, FlexboxGrid, Form, List, Tag } from 'rsuite';
import { AvatarProfil } from '../component/AvatarProfil';
import { DeleteAccountModal } from '../component/DeleteAccountModal';
import { ListRow } from '../component/ListRow';
import { profilFormSchema, newEmailFormSchema, newPasswordFormSchema } from '../services/SchemaType';
import FetchService from "../services/FetchService";
import AuthService from "../services/AuthService";

const Profil = () => {

    const [user, setUser] = useState({});
    const [formValues, setFormValues] = useState({});
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [pwConfirmError, setPwConfirmError] = useState("");
    const formRef = useRef();

    useEffect(() => {
        FetchService.get(`/users/${AuthService.getCurrentUserId()}/`).then((user) => {
            setUser(user);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
        })
    }, []);

    useEffect(() => {
        formRef.current.cleanErrorForField("departure");
    }, [passwordConfirm])

    const defaultFormValues = {
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password,
        "passwordConfirm": passwordConfirm
    }

    const isEmailNotTaken = (event) => {
        newEmailFormSchema.checkAsync(event.target.value);
    };

    const checkPasswordConfirm = () => {
        const errors = newPasswordFormSchema.check({ "password": password, "passwordConfirm": passwordConfirm });
        setPwConfirmError(errors.passwordConfirm.errorMessage);
    };

    const checkFormErrors = () => {
        const formErrors = profilFormSchema.check(formValues)
        let isErrorFound = false;
        for (const [key, value] of Object.entries(formErrors)) {
            if (value.hasError) {
                isErrorFound = true;
            }
        }
        return isErrorFound;
    }

    const updateProfil = () => {
        if (!checkFormErrors()) {
            console.log("update profil")
        }
    }

    return (
        <List>
            <Form checkTrigger='change' model={profilFormSchema} formValue={defaultFormValues} onChange={setFormValues} ref={formRef} fluid>
                <FlexboxGrid>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12} order={1} id="identity">
                        <div className='flex'>
                            <h4 className='my-4'>Identité</h4>
                            {user.isAdmin ? <Tag color='blue' className='ml-2 self-center'>Admin</Tag> : null}
                        </div>
                        <ListRow label="Nom">
                            {user.surname}
                        </ListRow>
                        <ListRow label="Prénom">
                            {user.firstName}
                        </ListRow>
                        <Form.Group>
                            <Form.ControlLabel>Email</Form.ControlLabel>
                            <Form.Control value={email} onChange={setEmail} name="email" key={user.email} onBlur={isEmailNotTaken} checkAsync />
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>Téléphone</Form.ControlLabel>
                            <Form.Control value={phoneNumber} onChange={setPhoneNumber} name="phoneNumber" key={user.phoneNumber} />
                        </Form.Group>
                        <ListRow label="Rôle">
                            {user.userType === "T" ? "Stagiaire" : user.isTeacher ? "Formateur" : "Employé"}
                        </ListRow>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12} className='order-2' style={{ height: 365 }}>
                        <h4 className='my-4'>Photo de profil</h4>
                        <div className='flex justify-center' style={{ height: 295 }}>
                            <AvatarProfil user={user} />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12} className='order-3'>
                        <h4 className='my-4'>Notifications</h4>
                        <ListRow label="Email">
                            {user.contactByMail ? <Checkbox defaultChecked name='contactByMail' key="contactByMail" /> : <Checkbox name='contactByMail' key="contactbyMail" />}
                        </ListRow>
                        <ListRow label="SMS">
                            {user.contactBySms ? <Checkbox defaultChecked name='contactBySms' key="contactBySms" /> : <Checkbox name='contactBySms' key="contactbySms" />}
                        </ListRow>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12} className='order-4'>
                        <h4 className='my-4'>Nouveau mot de passe</h4>
                        <Form.Group>
                            <Form.ControlLabel>Mot de passe</Form.ControlLabel>
                            <Form.Control type='text' name='password' value={password} onChange={(value) => setPassword(value)} />
                            <Form.ControlLabel>Confirmation</Form.ControlLabel>
                            <Form.Control type='text' name='passwordConfirm' autoComplete='off' value={passwordConfirm} errorMessage={pwConfirmError} onChange={(value) => setPasswordConfirm(value)} onBlur={checkPasswordConfirm} />
                        </Form.Group>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} order={5} className='p-4 text-end'>
                        <DeleteAccountModal />
                        <Button type='submit' appearance="primary" onClick={updateProfil} className='mx-0 md:mx-6'>Modifier</Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Form>
        </List>
    );
}

export { Profil };
