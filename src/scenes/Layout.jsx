import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container } from 'rsuite';
import { LayoutHeader } from '../component/LayoutHeader';
import { LayoutFooter } from '../component/LayoutFooter';

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