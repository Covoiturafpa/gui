import React from 'react';
import { Layout } from './scenes/Layout';
import { LoginLayout } from './scenes/LoginLayout';
import { LoginForm } from './component/LoginForm';
import { RegistrationForm } from './component/RegistrationForm';
import { ContentLayout } from './scenes/ContentLayout';


const App = () => {
    return (<>
        <Layout content={<ContentLayout />} />
    </>);
};

export {App};