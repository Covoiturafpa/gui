import React from 'react';
import ReactDOM from 'react-dom/client';
import { TableRides } from '../component/TableRides';


const MesTrajets = () => {
    return (
        <TableRides title="Mes trajets proposés" columns={["Trajet","Date & Heure", "Disponibilité", "Modif."]}/>
    );
};

export  {MesTrajets };