import React from 'react';
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
    const [expanded, setExpanded] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');
    return (
        <div style={{ width: 240 }}>
            <Sidenav expanded={expanded}>
                <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="1" icon={<SearchIcon/>}>
                            <NavLink to="/rechercher">Rechercher</NavLink>
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<AbTestIcon />}>
                            <NavLink to="/mes_trajets">Mes trajets</NavLink>
                        </Nav.Item>
                        <Nav.Item eventKey="3" icon={<PlusIcon />}>
                            <NavLink to="/proposer">Proposer un trajet</NavLink>
                        </Nav.Item>
                        <Nav.Item eventKey="4" icon={<PeoplesIcon />}>
                            <NavLink to="/gestion_users">Gestion utilisateur</NavLink>
                        </Nav.Item>
                        <Nav.Item eventKey="5" icon={<GearIcon />}>
                            <NavLink to="/gestion_centre">Gestion du centre</NavLink>
                        </Nav.Item>
                        <Nav.Item eventKey="6" icon={<ExitIcon />}>
                            <NavLink to="/disconnect">Déconnexion</NavLink>
                        </Nav.Item>
                    </Nav>
                    </Sidenav.Body>
            </Sidenav>
        </div>
    );
}
export { SidebarNavigation };