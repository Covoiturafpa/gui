import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Sidenav, Nav } from 'rsuite';
import {Icon} from '@rsuite/icons';
import AbTestIcon from '@rsuite/icons/AbTest';
import PlusIcon from '@rsuite/icons/Plus';
import PeoplesIcon from '@rsuite/icons/Peoples';
import SearchIcon from '@rsuite/icons/Search';
import ExitIcon from '@rsuite/icons/Exit';
import GearIcon from '@rsuite/icons/Gear';
import { AvatarIcon } from './AvatarIcon';
import { BellNotification } from './BellNotification';
import Car from '@rsuite/icons/legacy/Car';
import ListUl from '@rsuite/icons/legacy/ListUl';
import MapSigns from '@rsuite/icons/legacy/MapSigns';
import UserCircleO from '@rsuite/icons/legacy/UserCircleO';
import Exit from '@rsuite/icons/legacy/Exit';
import GearCircle from '@rsuite/icons/legacy/GearCircle';
import Group from '@rsuite/icons/legacy/Group';


const SidebarNavigation = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeKey, setActiveKey] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        if (activeKey !== "") {
            navigate("/" + activeKey);
        }
    }, [activeKey, navigate]);

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
                            <Nav.Item eventKey="mes_trajets" icon={<ListUl />}>
                                <p>Mes trajets</p>
                            </Nav.Item>
                            <Nav.Item eventKey="proposer" icon={<Car />}>
                                <p>Proposer un trajet</p>
                            </Nav.Item>
                            <Nav.Item eventKey="gestion_users" icon={<Group />}>
                                <p>Gestion utilisateur</p>
                            </Nav.Item>
                            <Nav.Item eventKey="gestion_centre" icon={<GearCircle />}>
                                <p>Gestion du centre</p>
                            </Nav.Item>
                        </Nav>
                        <div>
                        <Nav activeKey={activeKey} onSelect={setActiveKey}>
                            <Nav.Item eventKey="profil" icon={<UserCircleO />}>
                                <p>Profil</p>
                            </Nav.Item>
                            <Nav.Item eventKey="notification" icon={<BellNotification />}>
                                <p>Notification</p>
                            </Nav.Item>
                            <Nav.Item eventKey="deconnexion" icon={<Exit />}>
                                <p className=''>Déconnexion</p>
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