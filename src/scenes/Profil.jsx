import React, { useEffect, useState, useRef } from 'react';
import { Button, Checkbox, Col, FlexboxGrid, Form, List, Tag, CheckboxGroup } from 'rsuite';
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
    const [notificationsPref, setNotificationsPref] = useState([]);
    const [contactBySms, setContactBySms] = useState(false);
    const [contactByMail, setContactByMail] = useState(false);
    const [pwConfirmError, setPwConfirmError] = useState("");
    const formRef = useRef();

    useEffect(() => {
        FetchService.get(`/api/users/${AuthService.getCurrentUserId()}/`).then((user) => {
            setUser(user);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setContactBySms(user.contactBySms);
            setContactByMail(user.contactByMail);
        })
    }, []);


    useEffect(() => {
        if (contactByMail !== user.contactByMail) {
            setUser({...user, "contactByMail": contactByMail})
        }
    }, [contactByMail, user])

    useEffect(() => {
        if (contactBySms !== user.contactBySms) {
            setUser({...user, "contactBySms": contactBySms})
        }
    }, [contactBySms, user])

    useEffect(() => {
        formRef.current.cleanErrorForField("departure");
    }, [passwordConfirm])

    useEffect(() => {
        if (notificationsPref.includes("contactBySms")) {
            setContactBySms(true);
        } else {
            setContactBySms(false);
        }
        if (notificationsPref.includes("contactByMail")) {
            setContactByMail(true);
        } else {
            setContactByMail(false);
        }
    }, [notificationsPref])

    const defaultFormValues = {
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password,
        "passwordConfirm": passwordConfirm
    }

    const isEmailNotTaken = () => {
        newEmailFormSchema.checkAsync(email);
    };

    const checkPasswordConfirm = () => {
        const errors = newPasswordFormSchema.check({ "password": password, "passwordConfirm": passwordConfirm });
        setPwConfirmError(errors.passwordConfirm.errorMessage);
    };

    /**
     * FIXME: Validation incomplète, au niveau des mots de passe principalement
     * Voir "./services/SchemaType" et la doc rsuitejs
     * https://rsuitejs.com/components/form-validation/
     * https://github.com/rsuite/schema-typed#schema-typed
     */
    const checkFormErrors = () => {
        const formErrors = profilFormSchema.check(formValues)
        let isErrorFound = false;
        for (const [key, value] of Object.entries(formErrors)) {
            if (key && value.hasError) {
                isErrorFound = true;
            }
        }
        return isErrorFound;
    }

    /**
     * FIXME: Update desactiver car validation bugguée
     */
    const updateProfil = () => {
        if (!checkFormErrors()) {
            setUser({...user, "email": email, "phoneNumber": phoneNumber, "password": password})
            // FetchService.patch(`/api/users/${user.id}`, JSON.stringify(user));JSON.stringify(user)
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
                        <CheckboxGroup value={notificationsPref} onChange={value => setNotificationsPref(value)}>
                            <ListRow label="Email">
                                <Checkbox value="contactByMail"></Checkbox>
                            </ListRow>
                            <ListRow label="SMS">
                                <Checkbox value="contactBySms"></Checkbox>
                            </ListRow>
                        </CheckboxGroup>
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
