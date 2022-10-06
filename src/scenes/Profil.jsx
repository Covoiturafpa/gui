import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, FlexboxGrid, Form, Input, List, Tag } from 'rsuite';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';
import { AvatarProfil } from '../component/AvatarProfil';
import { DeleteAccountModal } from '../component/DeleteAccountModal';
import { ListRow } from '../component/ListRow';
import { profilFormSchema } from '../services/SchemaType';
import FetchService from "../services/FetchService";
import AuthService from "../services/AuthService";

const Profil = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        FetchService.get(`/users/${AuthService.getCurrentUserId()}/`).then((user) => {
            setUser(user);
        })
    }, []);

    return (
        <List>
            <Form checkTrigger='change' model={profilFormSchema} fluid>
                <FlexboxGrid>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12} order={1} id="identity">
                        <div className='flex'>
                            <h4 className='my-4'>Identité</h4>
                            { user.isAdmin ? <Tag color='blue' className='ml-2 self-center'>Admin</Tag> : null }
                        </div>
                        <ListRow label="Nom">
                            {user.surname}
                        </ListRow>
                        <ListRow label="Prénom">
                            {user.firstName}
                        </ListRow>
                        <ListRow as={FormGroup} label="Email">
                            <Input as={FormControl} defaultValue={user.email} name="email" key={user.email} />
                        </ListRow>
                        <ListRow as={FormGroup} label="Téléphone">
                            <Input as={FormControl} defaultValue={user.phoneNumber} name="phoneNumber" key={user.phoneNumber} />
                        </ListRow>
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
                        <ListRow as={FormGroup} label="Mot de passe">
                            <Input as={FormControl} type='password' name='password' />
                        </ListRow>
                        <ListRow as={FormGroup} label="Confirmation">
                            <Input as={FormControl} type='password' name='passwordConfirm' autoComplete='off' />
                        </ListRow>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} order={5} className='p-4 text-end'>
                        <DeleteAccountModal />
                        <Button appearance="primary" className='mx-0 md:mx-6'>Modifier</Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Form>
        </List>
    );
}

export { Profil };
