import React, { useState, useEffect } from 'react';
import { RideFormContextProvider } from '../component/RideForms/RideFormContextProvider';
import { Loader } from 'rsuite';
import { TableProposedRides } from '../component/TableProposedRides';
import { TableRequestedRides } from '../component/TableRequestedRides';
import  authService  from "../services/AuthService";
import  FetchService  from "../services/FetchService";



const MesTrajets = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rideOwned, setRideOwned] = useState([]);
    const [rideRequested, setRideRequested] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(authService.getCurrentUserId());

    useEffect(() => {
        const fetch = FetchService.get("/users/"+ userId + "/rides");
        fetch.then(
            (result) => {
                setRideOwned([]);
                setRideRequested([]);
                result.map(item => {
                    const passengers = item.requestedPassengers;
                    passengers.map(userToRide => {
                        if(userToRide.person.id == userId) {
                            if(userToRide.isDriver) {
                                setRideOwned(rideOwned => [ item,...rideOwned]);
                            }else if(!userToRide.isDriver) {
                                if(item.isActive) {
                                    setRideRequested(rideRequested => [ item,...rideRequested]);
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
    }, []);
    
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div className=' h-full flex justify-center items-center'><Loader size="sm" content="Chargement..." /></div>;
    }else {
        if(rideOwned.length === 0) {
            setRideOwned(0);
        }
        if(rideRequested.length === 0) {
            setRideRequested(0);
        }
        return (
            <div className='container mx-auto px-4'>
                <h1 className="text-center">Mes trajets</h1>
                <RideFormContextProvider>
                    <div className='my-3'>
                        <TableProposedRides id={userId} rides={rideOwned} />
                    </div>
                    <div className='my-3'>
                        <TableRequestedRides id={userId} rides={rideRequested} />
                    </div>
                </RideFormContextProvider>
            </div>
        );
    }
    
};

export  {MesTrajets };