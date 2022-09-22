import React from 'react';
import ReactDOM from 'react-dom/client';
import { Content, Sidebar } from 'rsuite';
import { Routes, Route } from 'react-router-dom';
import { MesTrajets } from './MesTrajets';
import { Profil } from './Profil';
import { Accueil } from './Accueil';
import { Notification } from './Notification';
import { FormLayout } from './FormLayout';
import { LoginForm } from '../component/LoginForm';
import { LogoutForm } from '../component/LogoutForm';
import { RegistrationForm } from '../component/RegistrationForm';
import { FormAndMap } from '../component/FormAndMap';

const ContentLayout = () => {
    return (<>
        <Content className='min-h-100 overflow-auto'>
            <Routes>
                <Route path="rechercher" element={<FormAndMap/>} />
                <Route path="mes_trajets" element={<MesTrajets className='h-100' />} />
                <Route path="proposer" element={<h1 className="text-center">Proposer un trajet</h1>} />
                <Route path="gestion_users" element={<h1 className="text-center">Gestion utilisateur</h1>} />
                <Route path="gestion_centre" element={<h1 className="text-center">Gestion du centre</h1>} />
                <Route path="login" element={<FormLayout title={"Login"} form={<LoginForm/>} />} />
                <Route path="inscription" element={<FormLayout title={"Inscription"} form={<RegistrationForm/>} />} />
                <Route path="profil" element={<FormLayout title={"Profil"} form={<Profil/>} />} />
                <Route path="deconnexion" element={<FormLayout title={"Déconnexion"} form={<LogoutForm/>} />} />
                <Route path="notification" element={<Notification />} />
                <Route path="*" element={<Accueil />} />
            </Routes>
        </Content>
    </>);
}

export { ContentLayout };