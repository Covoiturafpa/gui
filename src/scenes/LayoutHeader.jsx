import React from 'react';
import { Header } from 'rsuite';

const LayoutHeader = () => {
    return (<Header className='bg-red-200 h-12 md:h-20  lg:h-24'>
        <a className="no-underline hover:no-underline text-gray-700" href="/accueil">
            <h1>CovoiturAFPA</h1>
        </a>
    </Header>);
}

export { LayoutHeader };
