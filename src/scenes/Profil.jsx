import React, { useState, useEffect } from 'react';
import { List, Avatar, Input, Checkbox, Button, FlexboxGrid, Col, Form, Tag } from 'rsuite';
import { AvatarProfil } from '../component/AvatarProfil';
import { ListRow } from '../component/ListRow';
import { connectedUser, userToken } from '../config/api';


const Profil = (props) => {

    const [user, setUser] = useState({});
    const [authorities, setAuthorities] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setUser(connectedUser);
        console.log()
        if (!isLoaded) {
            connectedUser.authorities.map((item) => {
                let role = null;
                let newAuthorities = authorities;
                if (item.authority === "ROLE_USER") {
                    role = "Stagiaire";
                }
                if (item.authority === "ROLE_TEACHER") {
                    role = "Formateur";
                }
                if (item.authority === "ROLE_ADMIN") {
                    role = "Admin";
                }
                newAuthorities.push(role);
                setAuthorities(newAuthorities);
                setIsLoaded(true);
            })
        }
    }, []);

    return (
        <List>
            <Form>
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
                        <ListRow label="Email">
                            <Input value={user.email} />
                        </ListRow>
                        <ListRow label="Téléphone">
                            <Input value={user.phoneNumber} />
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
                            <Checkbox />
                        </ListRow>
                        <ListRow label="SMS">
                            <Checkbox />
                        </ListRow>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} md={12} className='order-4'>
                        <h4 className='my-4'>Mot de passe</h4>
                        <ListRow label="Ancien">
                            <Input type='password' />
                        </ListRow>
                        <ListRow label="Nouveau">
                            <Input type='password' />
                        </ListRow>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={24} order={5} className='p-4 text-end'>
                        <Button appearance="subtle" size='xs' >Supprimer son compte</Button>
                        <Button appearance="primary" className='mx-0 md:mx-6'>Modifier</Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Form>
        </List>
    );
}

export { Profil };