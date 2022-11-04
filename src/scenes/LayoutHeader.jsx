import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from 'rsuite';
import logo from "../assets/logo_covoiturafpa.png";

const LayoutHeader = () => {
    let navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/accueil");
    }

    return (<Header className='h-min flex justify-center'>
        <a className="no-underline hover:no-underline m-1" onClick={navigateToHome}>
            <img className="w-96 object-contain" src={logo} alt="Logo covoiturafpa" />
        </a>
    </Header>);
}

export { LayoutHeader };
