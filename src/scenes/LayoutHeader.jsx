import React from 'react';
import { Header } from 'rsuite';
import logo from "../assets/logo_covoiturafpa.png";

const LayoutHeader = () => {
    return (<Header className='h-min flex justify-center'>
        <a className="no-underline hover:no-underline text-gray-700 m-1" href="/accueil">
            <img className="w-96 object-contain" src={logo} alt="Logo covoiturafpa" />
        </a>
    </Header>);
}

export { LayoutHeader };
