import React from 'react';
import { Layout } from './scenes/Layout';
import { ContentLayout } from './scenes/ContentLayout';
import { Provider } from './services/UserToken';

const App = () => {
    return (<>
        <Provider>
            <Layout content={<ContentLayout />} />
        </Provider>
    </>);
};

export {App};