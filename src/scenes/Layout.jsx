import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container } from 'rsuite';
import { LayoutHeader } from '../scenes/LayoutHeader';
import { LayoutFooter } from '../scenes/LayoutFooter';

const Layout = (props) => {
  return (<>
    <Container className='h-screen w-full' content={props}>
      <LayoutHeader />
        <Container className='h-full'>
          {props.content}
        </Container>
      <LayoutFooter />
    </Container>
  </>);
};

export { Layout };