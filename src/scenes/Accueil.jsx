import Bell from '@rsuite/icons/legacy/Bell';
import Car from '@rsuite/icons/legacy/Car';
import Exit from '@rsuite/icons/legacy/Exit';
import ListUl from '@rsuite/icons/legacy/ListUl';
import MapSigns from '@rsuite/icons/legacy/MapSigns';
import UserCircleO from '@rsuite/icons/legacy/UserCircleO';
import React from 'react';
import AuthService from '../services/AuthService';
import { useSetLogin } from '../services/UserLogin';
import { useNavigate } from 'react-router-dom';
import { Col, Content, Grid, Panel, Row } from 'rsuite';


const Accueil = () => {
    let navigate = useNavigate();
    const setLogin = useSetLogin();

    function handleDisconnect() {
        AuthService.logout();
        setLogin({});
        navigate("/login");
    }

    return (
        <Content className='h-full max-h-full flex items-center align-middle'>
            <Grid fluid className='max-h-full'>
                <Row>
                    <Col xs={24} sm={12} md={12} lg={8} className='flex justify-center mt-4'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/rechercher")}>
                            <MapSigns className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Recherche de trajet</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} className='flex justify-center mt-6 lg:mt-4'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/proposer")}>
                            <Car className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Proposer un trajet</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} className='flex justify-center mt-6 md:mt-4'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/mes_trajets")}>
                            <ListUl className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Liste de mes trajets</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} className='flex justify-center mt-6 lg:mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/notification")}>
                            <Bell className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Notifications</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} className='flex justify-center mt-6 lg:mt-8'>
                        <Panel shaded bordered bodyFill className='inline-block w-40 md:w-60 text-center cursor-pointer' onClick={() => navigate("/profil")}>
                            <UserCircleO className='w-16 h-20 md:w-36 md:h-40' />
                            <h3 className='m-2 text-sm md:text-base lg:text-lg'>Profil</h3>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} className='flex justify-center mb-4 mt-6 md:mb-0 lg:mt-8'>
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
