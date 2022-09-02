import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import { SidebarNavigation } from '../component/SidebarNavigation';
import { Routes, Route } from 'react-router-dom';
import { MesTrajets } from './MesTrajets';
const Layout = () => {
    return (<>
    <Container>
      <Sidebar className='min-w-fit'>
        <SidebarNavigation/>
      </Sidebar>
      <Container>
        <Header>Header</Header>
        <Content>
            <Routes>
                <Route path="rechercher" element={ <h1 className="text-center">Rechercher</h1> }/>
                <Route path="mes_trajets" element={ <MesTrajets/> }/>
                <Route path="proposer" element={ <h1 className="text-center">Proposer un trajet</h1> }/>
                <Route path="gestion_users" element={ <h1 className="text-center">Gestion utilisateur</h1> }/>
                <Route path="gestion_centre" element={ <h1 className="text-center">Gestion du centre</h1> }/>
                <Route path="disconnect" element={ <h1 className="text-center">Déconnexion</h1> }/>
                <Route path="*" element={ <h2 className="text-center">Rechercher</h2> }/>
            </Routes>
        </Content>
        <Footer>Footer</Footer>
      </Container>
    </Container>
        
    </>);
};

export {Layout};