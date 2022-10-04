import React from 'react';
import { Header } from 'rsuite';
import logo from "../assets/logo_covoiturafpa.png";

const LayoutHeader = () => {
    return (<Header className='h-40 flex justify-center'>
        <a className="no-underline hover:no-underline text-gray-700 " href="/accueil">
            <img className="" src={logo} alt="Logo covoiturafpa" />
        </a>
    </Header>);
}

export { LayoutHeader };
