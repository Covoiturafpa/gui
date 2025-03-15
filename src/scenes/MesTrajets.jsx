import React, { useState, useEffect } from 'react';
import { RideFormContextProvider } from '../component/RideForms/RideFormContextProvider';
import { Loader } from 'rsuite';
import { TableProposedRides } from '../component/TableProposedRides';
import { TableRequestedRides } from '../component/TableRequestedRides';
import authService from "../services/AuthService";
import FetchService from "../services/FetchService";

const MesTrajets = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ridesOwned, setRidesOwned] = useState([]);
    const [ridesRequested, setRidesRequested] = useState([]);
    const [error, setError] = useState(null);
    const [userId] = useState(authService.getCurrentUserId());
    const [autoReload, setAutoReload] = useState(false);

    useEffect(() => {
        setAutoReload(false);
        FetchService.get(`/api/users/${userId}/rides`)
            .then(result => {
                // Réinitialisation des tableaux
                setRidesOwned([]);
                setRidesRequested([]);
                if (!result || result.length === 0) {
                    // Aucun trajet trouvé : on garde des tableaux vides
                    setRidesOwned([]);
                    setRidesRequested([]);
                } else {
                    result.forEach(item => {
                        const passengers = item.requestedPassengers || [];
                        passengers.forEach(userToRide => {
                            if (userToRide.person && userToRide.person.id === parseInt(userId)) {
                                if (userToRide.isDriver) {
                                    setRidesOwned(prev => [item, ...prev]);
                                } else if (!userToRide.isDriver && item.isActive) {
                                    setRidesRequested(prev => [item, ...prev]);
                                }
                            }
                        });
                    });
                }
                setIsLoaded(true);
            })
            .catch(err => {
                setIsLoaded(true);
                setError(err);
            });
    }, [autoReload, userId]);

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div className='h-full flex justify-center items-center'><Loader size="sm" content="Chargement..." /></div>;
    } else {
        return (
            <div className='container mx-auto px-4'>
                <h1 className="text-center">Mes trajets</h1>
                <RideFormContextProvider>
                    <div className='my-3'>
                        <TableProposedRides setReload={setAutoReload} id={userId} rides={ridesOwned} />
                    </div>
                    <div className='my-3'>
                        <TableRequestedRides id={userId} rides={ridesRequested} />
                    </div>
                </RideFormContextProvider>
            </div>
        );
    }
};

export { MesTrajets };
