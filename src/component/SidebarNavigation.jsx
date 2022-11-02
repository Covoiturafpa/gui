import React, { useEffect, useState } from 'react';

import AuthService from "../services/AuthService";
import Car from '@rsuite/icons/legacy/Car';
import Exit from '@rsuite/icons/legacy/Exit';
import GearCircle from '@rsuite/icons/legacy/GearCircle';
import Group from '@rsuite/icons/legacy/Group';
import ListUl from '@rsuite/icons/legacy/ListUl';
import MapSigns from '@rsuite/icons/legacy/MapSigns';
import UserCircleO from '@rsuite/icons/legacy/UserCircleO';
import { useNavigate } from 'react-router-dom';
import { Nav, Sidenav } from 'rsuite';
import { BellNotification } from './BellNotification';
import { useSetLogin, useTrackedLogin } from '../services/UserLogin';


const SidebarNavigation = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeKey, setActiveKey] = useState('');
    const stateLogin = useTrackedLogin();
    const setLogin = useSetLogin();
    const [rolesUser, setRolesUser] = useState(" ");
    let navigate = useNavigate();


    useEffect(() => {
        if(stateLogin.roles) {
            setRolesUser(stateLogin.roles);    

        }
    }, [stateLogin])

    useEffect(() => {
        if(activeKey === "deconnexion") {
            AuthService.logout();
            setLogin({});
            setActiveKey("");
            navigate("/login");
        }else if (activeKey !== "" ) {
            navigate("/" + activeKey);
        }

    }, [activeKey, navigate, setLogin]);

    return (
        <div className='h-full'>
            <Sidenav className="h-full" expanded={expanded}>
                <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                <Sidenav.Body className="h-full">
                    <Nav className="h-full flex flex-col justify-between" activeKey={activeKey} onSelect={setActiveKey} >
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            <Nav.Item eventKey="rechercher" icon={<MapSigns />}>
                                <p>Rechercher</p>
                            </Nav.Item>
                            <Nav.Item eventKey="proposer" icon={<Car />}>
                                <p>Proposer un trajet</p>
                            </Nav.Item>
                            <Nav.Item eventKey="mes_trajets" icon={<ListUl />}>
                                <p>Mes trajets</p>
                            </Nav.Item>
                            {rolesUser.includes('ROLE_TEACHER') || rolesUser.includes('ROLE_ADMIN') ?
                                <Nav.Item eventKey="gestion_utilisateurs" icon={<Group />}>
                                    <p>Gestion des utilisateurs</p>
                                </Nav.Item>
                            : "" }
                            {rolesUser.includes('ROLE_ADMIN') ? 
                                <Nav.Item eventKey="gestion_centre" icon={<GearCircle />}>
                                    <p>Gestion du centre</p>
                                </Nav.Item>
                            : "" }
                        </Nav>
                        <div>
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            <Nav.Item eventKey="profil" icon={<UserCircleO />}>
                                <p>Profil</p>
                            </Nav.Item>
                            <Nav.Item eventKey="notifications" icon={<BellNotification />}>
                                <p>Notifications</p>
                            </Nav.Item>
                            <Nav.Item eventKey="deconnexion" icon={<Exit />}>
                                <p>Déconnexion</p>
                            </Nav.Item>
                        </Nav>
                        </div>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
}
export { SidebarNavigation };
