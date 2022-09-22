import React, { useState, useEffect } from 'react';
import { TableProposedRides } from '../component/TableProposedRides';
import { TableRequestedRides } from '../component/TableRequestedRides';
import { api } from '../config/api';
import { useSetToken, useTrackedToken } from '../services/UserToken';



const MesTrajets = () => {
    const [idUser, setIdUser] = useState(43);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rideOwned, setRideOwned] = useState([]);
    const [rideRequested, setRideRequested] = useState([]);
    const [error, setError] = useState(null);
    const token = useTrackedToken();
    
    useEffect(() => {
        fetch(api + "/users/"+ idUser + "/rides")
        .then(res => res.json())
        .then(
            (result) => {
                setRideOwned([]);
                setRideRequested([]);
                result.map(item => {
                    const passengers = item.possiblePassengers;
                    passengers.map(userToRide => {
                        if(userToRide.user.id === idUser) {
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
        console.log(token);
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
                    <TableProposedRides id={idUser} rides={rideOwned} />
                </div>
                <div className='my-3'>
                   <TableRequestedRides id={idUser} rides={rideRequested} />
                </div>
            </div>
        );
    }
    
};

export  {MesTrajets };