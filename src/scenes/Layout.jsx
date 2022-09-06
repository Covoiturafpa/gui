import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import { SidebarNavigation } from '../component/SidebarNavigation';
import { Routes, Route } from 'react-router-dom';
import { MesTrajets } from './MesTrajets';
const Layout = () => {
  return (<>
    <Container className='h-screen'>
      <Header className='bg-red-200 h-12 md:h-20  lg:h-24'>Header</Header>
      <Container className='h-full'>
        <Sidebar className='h-full max-w-fit'>
        <SidebarNavigation />
        </Sidebar>
        <Content className='bg-orange-200 h-100'>
          <Routes>
            <Route path="rechercher" element={<h1 className="text-center">Rechercher</h1>} />
            <Route path="mes_trajets" element={<MesTrajets className='h-100' />} />
            <Route path="proposer" element={<h1 className="text-center">Proposer un trajet</h1>} />
            <Route path="gestion_users" element={<h1 className="text-center">Gestion utilisateur</h1>} />
            <Route path="gestion_centre" element={<h1 className="text-center">Gestion du centre</h1>} />
            <Route path="disconnect" element={<h1 className="text-center">Déconnexion</h1>} />
            <Route path="*" element={<h2 className="text-center">404</h2>} />
          </Routes>
        </Content>
      </Container>
      <Footer className='bg-blue-200 h-12 md:h-20  lg:h-24'>Footer</Footer>
    </Container>
  </>);
};

export { Layout };