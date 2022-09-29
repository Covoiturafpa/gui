import React, { useState, useEffect } from 'react';
import { TableProposedRides } from '../component/TableProposedRides';
import { TableRequestedRides } from '../component/TableRequestedRides';
import { api } from '../config/api';
import { useSetLogin, useTrackedLogin } from '../services/UserLogin';
import AuthHeader from "../services/AuthHeader";



const MesTrajets = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [rideOwned, setRideOwned] = useState([]);
    const [rideRequested, setRideRequested] = useState([]);
    const [error, setError] = useState(null);
    const setLogin = useSetLogin();
    const stateLogin = useTrackedLogin();
    const [headers, setHeaders] = useState(AuthHeader());
    
    useEffect(() => {
        console.log(headers);
        fetch(api + "/users/"+ stateLogin.userId + "/rides", headers)
        .then(res => res.json())
        .then(
            (result) => {
                setRideOwned([]);
                setRideRequested([]);
                result.map(item => {
                    const passengers = item.possiblePassengers;
                    passengers.map(userToRide => {
                        if(userToRide.user.id === stateLogin.idUser) {
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
        return <div>Chargement...</div>;
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
                <div className='my-3'>
                    <TableProposedRides id={stateLogin.idUser} rides={rideOwned} />
                </div>
                <div className='my-3'>
                   <TableRequestedRides id={stateLogin.idUser} rides={rideRequested} />
                </div>
            </div>
        );
    }
    
};

export  {MesTrajets };