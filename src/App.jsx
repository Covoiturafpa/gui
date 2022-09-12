import React from 'react';
import { Layout } from './scenes/Layout';
import { ContentLayout } from './scenes/ContentLayout';

const App = () => {
    return (<>
        <Layout content={<ContentLayout />} />
    </>);
};

export {App};