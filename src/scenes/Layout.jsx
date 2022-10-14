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
  const [showBackground, setShowBackground] = useState("transparent");

  useEffect(() => {
    if (sessionStorage.getItem('user') || localStorage.getItem('user')) {
      setShowSidebar(true);
      setShowBackground("#fcfcfc");
    } else {
      setShowSidebar(false);
      setShowBackground("transparent");
    }
  }, [stateLogin]);

  return (<>
    <Container className='h-screen w-full bg-header_footer bg-no-repeat bg-cover bg-top ' content={props}>
      <LayoutHeader />
      <Container style={{ background: `${showBackground}` }} className='h-full overflow-auto'>
        {showSidebar ?
          <Sidebar className='min-h-full max-w-fit'>
            <SidebarNavigation className="" />
          </Sidebar>
          : ""}
        {props.content}
      </Container>
      <LayoutFooter />

    </Container>


  </>);
};

export { Layout };