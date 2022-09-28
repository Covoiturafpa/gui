import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Content } from 'rsuite';
import { Leaflet } from '../component/MapLeaflet';
import { LoginForm } from '../component/LoginForm';
import { RegistrationForm } from '../component/RegistrationForm';
import { Accueil } from './Accueil';
import { BookingForm } from './BookingForm';
import { FormLayout } from './FormLayout';
import { MesTrajets } from './MesTrajets';
import { Notification } from './Notification';
import { Profil } from './Profil';
import { useTrackedLogin } from '../services/UserLogin';
import { useState } from 'react';
import { useEffect } from 'react';


const ContentLayout = () => {
    const [pathAccess, setPathAccess] = useState(false);
    const stateLogin = useTrackedLogin();
    useEffect(() => {
        if(sessionStorage.getItem('user') || localStorage.getItem('user')) {
            setPathAccess(true);
        }else {
            setPathAccess(false);
        }
    }, [stateLogin]);

        return (<>
            <Content className='min-h-100 overflow-auto'>
                <Routes>
                    <Route path="*" element={<Navigate to="/login"/>} /> 
                    <Route path="login" element={<FormLayout title={"Login"} form={<LoginForm/>} />} /> 
                    {pathAccess ? <>                    
                        <Route path="rechercher" element={<BookingForm />} />
                        <Route path="mes_trajets" element={<MesTrajets className='h-100' />} />
                        <Route path="proposer" element={<h1 className="text-center">Proposer un trajet</h1>} />
                        <Route path="gestion_utilisateurs" element={<h1 className="text-center">Gestion utilisateur</h1>} />
                        <Route path="gestion_centre" element={<h1 className="text-center">Gestion du centre</h1>} />
                        <Route path="inscription" element={<FormLayout title={"Inscription"} form={<RegistrationForm/>} />} />
                        <Route path="profil" element={<FormLayout title={"Profil"} form={<Profil/>} />} />
                        <Route path="notifications" element={<Notification />} />
                        <Route path="accueil" element={<Accueil />} />
                        {/*<Route path="*" element={<Accueil/>} />*/}  
                    </> : "" }
                </Routes>
            </Content>
        </>);
    
}

export { ContentLayout };
