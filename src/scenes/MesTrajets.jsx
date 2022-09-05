import React from 'react';
import ReactDOM from 'react-dom/client';
import { TableRides } from '../component/TableRides';


const MesTrajets = () => {
    return (
        <div className='h-100'>
            <h1 className="text-center">Mes trajets</h1>
            <TableRides title="Mes trajets proposés" columns={["Trajet","Date & Heure", "Disponibilité", "Modif."]} className='h-100'/>
        </div>
    );
};

export  {MesTrajets };