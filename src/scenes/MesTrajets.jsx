import React from 'react';
import ReactDOM from 'react-dom/client';
import { TableProposedRides } from '../component/TableProposedRides';
import { TableRequestedRides } from '../component/TableRequestedRides';


const MesTrajets = () => {
    return (

        <div className='container mx-auto px-4'>
            <h1 className="text-center">Mes trajets</h1>
            <div className='my-3'>
                <TableProposedRides />
            </div>
            <div className='my-3'>
                <TableRequestedRides/>
            </div>
        </div>
    );
};

export  {MesTrajets };