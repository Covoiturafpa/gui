import {React, useState, useEffect} from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { Sidenav, Nav, Toggle } from 'rsuite';
import AbTestIcon from '@rsuite/icons/AbTest';
import PlusIcon from '@rsuite/icons/Plus';
import PeoplesIcon from '@rsuite/icons/Peoples';
import SearchIcon from '@rsuite/icons/Search';
import GroupIcon from '@rsuite/icons/legacy/Group';
import ExitIcon from '@rsuite/icons/Exit';
import GearIcon from '@rsuite/icons/Gear';

import { NavLink } from 'react-router-dom';
const SidebarNavigation = () => {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('rechercher');
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/"+activeKey);
    }, [activeKey]);


    return (
        <div>
            <Sidenav className="h-screen" expanded={expanded}>
                <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                <Sidenav.Body className="h-full">
                    <Nav className="justify-between" activeKey={activeKey} onSelect={setActiveKey} >
                        <Nav.Item  eventKey="rechercher"   icon={<SearchIcon/>}>
                            <p>Rechercher</p>
                        </Nav.Item>
                        <Nav.Item eventKey="mes_trajets" icon={<AbTestIcon />}>
                            <p>Mes trajets</p>
                        </Nav.Item>
                        <Nav.Item eventKey="proposer" icon={<PlusIcon />}>
                            <p>Proposer un trajet</p>
                        </Nav.Item>
                        <Nav.Item eventKey="gestion_users" icon={<PeoplesIcon />}>
                            <p>Gestion utilisateur</p>
                        </Nav.Item>
                        <Nav.Item eventKey="gestion_centre" icon={<GearIcon />}>
                            <p>Gestion du centre</p>
                        </Nav.Item>
                        <Nav.Item eventKey="disconnect" icon={<ExitIcon/>}>
                            <p>Déconnexion</p>
                        </Nav.Item>
                    </Nav>
                    </Sidenav.Body>
            </Sidenav>
        </div>
    );
}
export { SidebarNavigation };