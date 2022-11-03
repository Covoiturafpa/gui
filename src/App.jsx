import React, { useEffect } from 'react';
import { ContentLayout } from './scenes/ContentLayout';
import { Layout } from './scenes/Layout';
import { useSetLogin } from './services/UserLogin';


const App = () => {
    const setLogin = useSetLogin();

    useEffect(() => {
        window.onbeforeunload = function() {
            if(localStorage.getItem('user')) {
                setLogin(JSON.parse(localStorage.getItem('user')));
            }
            if(sessionStorage.getItem('user')) {
                setLogin(JSON.parse(sessionStorage.getItem('user')));
            }
            return true;
        };

        return () => {
            window.onbeforeunload = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<>
        <Layout content={<ContentLayout />} />
    </>);
};

export { App };
