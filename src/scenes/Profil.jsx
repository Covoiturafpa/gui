import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'rsuite';
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
                        console.log(user);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        return () => console.log("demontage")
    }, []);

    return (<>
        <Avatar circle size='lg' src="https://avatars.githubusercontent.com/u/12592949" alt={user.surname + " " + user.firstName} />
        <List>
            <ListRow label="Nom"> {user.surname} </ListRow>
            <ListRow label="Prénom"> {user.firstName} </ListRow>
            <ListRow label="Email"> {user.email} </ListRow>
            <ListRow label="Téléphone"> {user.phoneNumber} </ListRow>
        </List>
    </>);
}

export { Profil };