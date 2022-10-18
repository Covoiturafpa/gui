import React, { useState, useEffect } from 'react';
import { RideFormContextProvider } from '../component/RideForms/RideFormContextProvider';
import { Loader } from 'rsuite';
import { TableProposedRides } from '../component/TableProposedRides';
import { TableRequestedRides } from '../component/TableRequestedRides';
import  authService  from "../services/AuthService";
import  FetchService  from "../services/FetchService";



const MesTrajets = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ridesOwned, setRidesOwned] = useState([]);
    const [ridesRequested, setRidesRequested] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [autoReload, setAutoReload] = useState(false);
    useEffect(() => {
        setAutoReload(false);
        const fetch = FetchService.get("/users/"+ userId + "/rides");
        fetch.then(
            (result) => {
                setRidesOwned([]);
                setRidesRequested([]);
                result.map(item => {
                    const passengers = item.requestedPassengers;
                    passengers.map(userToRide => {
                        if(userToRide.person.id == userId) {
                            if(userToRide.isDriver) {
                                setRidesOwned(rideOwned => [ item,...rideOwned]);
                            }else if(!userToRide.isDriver) {
                                if(item.isActive) {
                                    setRidesRequested(rideRequested => [ item,...rideRequested]);
                                }
                            }
                        }
                        if(result[result.length - 1] === item) {
                            setIsLoaded(true);
                        }
                    });
                });

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [autoReload]);
    
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div className=' h-full flex justify-center items-center'><Loader size="sm" content="Chargement..." /></div>;
    }else {
        if(ridesOwned.length === 0) {
            setRidesOwned(0);
        }
        if(ridesRequested.length === 0) {
            setRidesRequested(0);
        }
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

export  {MesTrajets };