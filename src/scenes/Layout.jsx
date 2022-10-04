import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Sidebar } from 'rsuite';
import { SidebarNavigation } from '../component/SidebarNavigation';
import { LayoutHeader } from '../scenes/LayoutHeader';
import { LayoutFooter } from '../scenes/LayoutFooter';
import { useSetLogin, useTrackedLogin } from '../services/UserLogin';
import { useState } from 'react';
import { useEffect } from 'react';

const Layout = (props) => {
  const setLogin = useSetLogin();
  const stateLogin = useTrackedLogin();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('user') || localStorage.getItem('user')) {
      setShowSidebar(true);
    }else {
      setShowSidebar(false);
    }
  }, [stateLogin]);

  return (<>
    <Container className='h-screen w-full bg-header_footer bg-no-repeat bg-cover bg-top ' content={props}>
      <LayoutHeader />
      <Container className='h-full overflow-auto'>
        {showSidebar ? 
          <Sidebar className='h-full max-w-fit'>
            <SidebarNavigation />
          </Sidebar>
        : "" }
        {props.content}
      </Container>
    </Container>
    <LayoutFooter />


  </>);
};

export { Layout };