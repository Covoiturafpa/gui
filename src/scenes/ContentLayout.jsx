import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Content } from 'rsuite';
import LoginForm from '../component/LoginForm';
import { RegistrationForm } from '../component/RegistrationForm';
import Accueil from './Accueil';
import { Booking } from './Booking';
import { FormLayout } from './FormLayout';
import { MesTrajets } from './MesTrajets';
import { SuggestRide } from './SuggestRide';
import { Notification } from './Notification';
import { Profil } from './Profil';
import { UserManagement } from './UserManagement';
import { useTrackedLogin } from '../services/UserLogin';

import { RideFormContextProvider } from '../component/RideForms/RideFormContextProvider';
import { SuccessfulRegistration } from '../component/SuccessfulRegistration';

const ContentLayout = () => {
    const [pathAccess, setPathAccess] = useState(false);
    const stateLogin = useTrackedLogin();

    useEffect(() => {
        if (sessionStorage.getItem('user') || localStorage.getItem('user')) {
            setPathAccess(true);
        } else {
            setPathAccess(false);
        }
    }, [stateLogin]);

    return (<>
        <Content className='overflow-auto'>
            <Routes>
                <Route path="*" element={<Navigate to="/connexion" />} />
                <Route path="connexion" element={<FormLayout title={""} form={<LoginForm />} />} />
                <Route path="inscription" element={<FormLayout title={"Inscription"} form={<RegistrationForm />} />} />
                <Route path="inscription_reussie" element={<SuccessfulRegistration />} />
                {pathAccess ? <>
                    <Route path="rechercher" element={<RideFormContextProvider><Booking /></RideFormContextProvider>} />
                    <Route path="mes_trajets" element={<MesTrajets className='h-100' />} />
                    <Route path="proposer" element={<SuggestRide />} />
                    <Route path="gestion_utilisateurs" element={<UserManagement />} />
                    <Route path="gestion_centre" element={<h1 className="text-center">Gestion du centre</h1>} />
                    <Route path="profil" element={<FormLayout title={"Profil"} form={<Profil />} />} />
                    <Route path="notifications" element={<Notification />} />
                    <Route path="accueil" element={<Accueil />} />
                </> : ""}
            </Routes>
        </Content>
    </>);

}

export { ContentLayout };
