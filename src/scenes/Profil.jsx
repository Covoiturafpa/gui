import React, { useState, useEffect } from 'react';
import { List, Avatar, Input, Checkbox, Button, FlexboxGrid, Col, Uploader } from 'rsuite';
import { AvatarProfil } from '../component/AvatarProfil';
import { ListRow } from '../component/ListRow';
import { api } from '../config/api';


const Profil = (props) => {

    const [idUser, setIdUser] = useState(43);
    const [user, setUser] = useState({});

    console.log("render");

    useEffect(() => {
        console.log("useEffect");
        const options = { method: "GET" };
        fetch(api + "/users/" + idUser, options)
            .then(res => {
                return res.json()
            }).then(
                (result) => {
                    setUser(result);
                },
                (error) => {
                    console.log(error);
                }
            )
        return () => console.log("demontage")
    }, []);

    return (<>
        <List>
            <FlexboxGrid>
                <FlexboxGrid.Item as={Col} colspan={24} md={12} order={1} id="identity">
                    <h4 className='my-4'>Identité</h4>
                    <ListRow label="Nom"> {user.surname} </ListRow>
                    <ListRow label="Prénom"> {user.firstName} </ListRow>
                    <ListRow label="Email"> <Input value={user.email} /> </ListRow>
                    <ListRow label="Téléphone"> <Input value={user.phoneNumber} /> </ListRow>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={12} className='order-2' style={{ height: 282 }}>
                    <h4 className='my-4'>Photo de profil</h4>
                    <AvatarProfil user={user} />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} className='order-3'>
                    <h4 className='my-4'>Notifications</h4>
                    <ListRow label="Email">  
                        <Checkbox > </Checkbox> 
                    </ListRow>
                    <ListRow label="SMS">  
                        <Checkbox></Checkbox> 
                    </ListRow>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={12} className='order-4'>
                    <h4 className='my-4'>Mot de passe</h4>
                    <ListRow label="Ancien">  <Input type='password' /> </ListRow>
                    <ListRow label="Nouveau">  <Input type='password' /> </ListRow>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={12} order={5}>
                    <Button appearance="primary">Modifier</Button>
                    <Button appearance="ghost" color='red'>Supprimer son compte</Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List>
    </>);
}

export { Profil };