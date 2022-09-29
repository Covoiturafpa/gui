import Bell from '@rsuite/icons/legacy/Bell';
import Car from '@rsuite/icons/legacy/Car';
import Exit from '@rsuite/icons/legacy/Exit';
import ListUl from '@rsuite/icons/legacy/ListUl';
import MapSigns from '@rsuite/icons/legacy/MapSigns';
import Group from '@rsuite/icons/legacy/Group';
import UserCircleO from '@rsuite/icons/legacy/UserCircleO';
import GearCircle from '@rsuite/icons/legacy/GearCircle';
import { React, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { useSetLogin, useTrackedLogin } from '../services/UserLogin';
import { useNavigate } from 'react-router-dom';
import { Col, Content, Grid, Panel, Row } from 'rsuite';


const Accueil = () => {
    let navigate = useNavigate();
    const setLogin = useSetLogin();
    const [rolesUser, setRolesUser] = useState(" ");
    const [customLg, setCustomLg] = useState(8);
    const stateLogin = useTrackedLogin();

    useEffect(() => {
        if(stateLogin.roles) {
            setRolesUser(stateLogin.roles);    
            if(stateLogin.roles.includes('ROLE_ADMIN') || stateLogin.roles.includes('ROLE_TEACHER')) {
                setCustomLg(6)
            }
        }

    }, [stateLogin])

    function handleDisconnect() {
        AuthService.logout();
        setLogin({});
        navigate("/login");
    }

    return (
        <Content className='h-full max-h-full flex items-center align-middle'>
            <Grid fluid className='max-h-full'>
                <Row className="flex flex-wrap">
                    <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/rechercher")}>
                            <MapSigns className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Recherche de trajet</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-6 lg:mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/proposer")}>
                            <Car className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Proposer un trajet</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-6 lg:mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/mes_trajets")}>
                            <ListUl className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Liste de mes trajets</h3>
                        </Panel>
                    </Col>
                    
                    <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-6 lg:mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/notification")}>
                            <Bell className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Notifications</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-6 lg:mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/profil")}>
                            <UserCircleO className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Profil</h3>
                        </Panel>
                    </Col>
                    {rolesUser.includes('ROLE_TEACHER') || rolesUser.includes('ROLE_ADMIN') ?
                        <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-6 lg:mt-8'>
                            <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 md:h-18 text-center cursor-pointer' onClick={() => navigate("/mes_trajets")}>
                                <Group className='w-16 h-20 md:w-36 md:h-40' />
                                <h3 className='m-2 text-sm md:text-base lg:text-lg whitespace-nowrap'>Gestion des utilisateurs</h3>
                            </Panel>
                        </Col>
                    : ""}
                    {rolesUser.includes('ROLE_ADMIN') ? 
                        <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-6 lg:mt-8'>
                            <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/mes_trajets")}>
                                <GearCircle className='w-16 h-20 md:w-36 md:h-40' />
                                <h3 className='m-2 text-sm md:text-base lg:text-lg'>Gestion du centre</h3>
                            </Panel>
                        </Col>
                    : ""}
                    <Col xs={24} sm={12} md={12} lg={customLg} className='flex justify-center mt-6 lg:mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={handleDisconnect}>
                            <Exit className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Me déconnecter</h3>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Content>
    )
}

export { Accueil };
