import React from 'react';
import { Layout } from './scenes/Layout';
import { ContentLayout } from './scenes/ContentLayout';
import { useSetLogin, useTrackedLogin } from './services/UserLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuthService from "./services/AuthService";


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

    }, []);
    return (<>
        <Layout content={<ContentLayout />} />
    </>);
};

export {App};