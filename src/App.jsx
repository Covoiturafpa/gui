import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from './scenes/Layout';
import { Routes, Route } from 'react-router-dom';
import { MesTrajets } from './scenes/MesTrajets';

const App = () => {
    return (<>
        <Layout/>
        <Routes>
            <Route path="rechercher" element={ <h1>Rechercher</h1> }/>
            <Route path="mes_trajets" element={ <MesTrajets/> }/>
            <Route path="proposer" element={ <h1>Proposer un trajet</h1> }/>
            <Route path="gestion_users" element={ <h1>Gestion utilisateur</h1> }/>
            <Route path="gestion_centre" element={ <h1>Gestion du centre</h1> }/>
            <Route path="disconnect" element={ <h1>Déconnexion</h1> }/>
            <Route path="*" element={ <h2>Rechercher</h2> }/>
        </Routes>
    </>);
};

export {App};