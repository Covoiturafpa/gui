import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Sidebar } from 'rsuite';
import { SidebarNavigation } from '../component/SidebarNavigation';
import { LayoutHeader } from '../component/LayoutHeader';
import { LayoutFooter } from '../component/LayoutFooter';

const Layout = (props) => {
  return (<>
    <Container className='h-screen w-full' content={props}>
      <LayoutHeader />
        <Container className='h-full overflow-auto'>
          <Sidebar className='h-full max-w-fit'>
              <SidebarNavigation />
          </Sidebar>
          {props.content}
        </Container>
      <LayoutFooter />
    </Container>
  </>);
};

export { Layout };