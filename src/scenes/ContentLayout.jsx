import React from 'react';
import ReactDOM from 'react-dom/client';
import { Content, Sidebar } from 'rsuite';
import { SidebarNavigation } from '../component/SidebarNavigation';
import { Routes, Route } from 'react-router-dom';
import { MesTrajets } from './MesTrajets';
import { FormLayout } from './FormLayout';
import { LoginForm } from '../component/LoginForm';
import { RegistrationForm } from '../component/RegistrationForm';

const ContentLayout = () => {
    return (<>
        <Sidebar className='h-full max-w-fit'>
            <SidebarNavigation />
        </Sidebar>
        <Content className='min-h-100'>
            <Routes>
                <Route path="rechercher" element={<h1 className="text-center">Rechercher</h1>} />
                <Route path="mes_trajets" element={<MesTrajets className='h-100' />} />
                <Route path="proposer" element={<h1 className="text-center">Proposer un trajet</h1>} />
                <Route path="gestion_users" element={<h1 className="text-center">Gestion utilisateur</h1>} />
                <Route path="gestion_centre" element={<h1 className="text-center">Gestion du centre</h1>} />
                <Route path="disconnect" element={<h1 className="text-center">Déconnexion</h1>} />
                <Route path="login" element={<FormLayout title={"Login"} form={<LoginForm/>} />} />
                <Route path="inscription" element={<FormLayout title={"Inscription"} form={<RegistrationForm/>} />} />
                <Route path="*" element={<h2 className="text-center">404</h2>} />
            </Routes>
        </Content>
    </>);
}

export { ContentLayout };