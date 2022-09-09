import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { TableProposedRides } from '../component/TableProposedRides';
import { TableRequestedRides } from '../component/TableRequestedRides';


const MesTrajets = () => {
    const [idUser, setIdUser] = useState(51);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [rideByUser, setRideByUser] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/rides/")
        .then(res => res.json())
        .then(
            (result) => {
                setRideByUser([]);
                result.map(item => {
                    const passengers = item.possiblePassengers;
                    passengers.map(userToRide => {
                        if(userToRide.user.id === idUser) {
                            setRideByUser(rideByUser => [ item,...rideByUser]);
                            console.log(rideByUser.length);

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
    }else if(rideByUser.length === 0) {
        return (
            <div className='container mx-auto px-4'>
                <h1 className="text-center">Mes trajets</h1>
                <div className='my-3'>
                    <TableProposedRides rides={0} />
                </div>
                <div className='my-3'>
                    
                </div>
            </div>
        );
    }else {
        return (
            <div className='container mx-auto px-4'>
                <h1 className="text-center">Mes trajets</h1>
                <div className='my-3'>
                    <TableProposedRides rides={rideByUser} />
                </div>
                <div className='my-3'>
                   
                </div>
            </div>
        );
    }
    
};

export  {MesTrajets };