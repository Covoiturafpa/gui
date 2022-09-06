import React from 'react';
import ReactDOM from 'react-dom/client';
import { TableProposedRides } from '../component/TableProposedRides';


const MesTrajets = () => {
    return (
        <div className='h-100'>
            <h1 className="text-center">Mes trajets</h1>
            <TableProposedRides className='h-100'/>
        </div>
    );
};

export  {MesTrajets };