import React from 'react';
import ReactDOM from 'react-dom/client';
import { TableRides } from '../component/TableRides';


const MesTrajets = () => {
    return (
        <div>
            <h1 className="text-center">Mes trajets</h1>
            <TableRides title="Mes trajets proposés" columns={["Trajet","Date & Heure", "Disponibilité", "Modif."]}/>
        </div>
    );
};

export  {MesTrajets };