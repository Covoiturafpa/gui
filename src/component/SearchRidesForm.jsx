import { useState, createContext, useContext } from 'react';
import { Form, Button } from 'rsuite';
import { RideFormInputs } from './RideFormInputs';
import FetchService from '../services/FetchService';
import { DestinationContext } from '../scenes/Booking';
import { RideFormContextProvider, FormContext } from './contexts/RideFormContextProvider';



const SearchRidesForm = () => {
    const { destination } = useContext(DestinationContext);
    const formContext = useContext(FormContext);
    
    function createRideSearchParameters() {
        let jsonRequest = {
            rideType: formContext.rideType,
            destination: {
                isFromAfpa: formContext.isFromAfpa,
                latitude: formContext.destination.lat,
                longitude: formContext.destination.lon,
                city: {
                    name: (formContext.isFromAfpa ? formContext.arrival : formContext.departure)
                }
            }
    
        };

        if (departureDay !== undefined) {
            jsonRequest.departureDay = departureDay.toISOString().substring(0,10);
        } else {
            jsonRequest.beginning = recurringDates[0].toISOString().substring(0,10);
            jsonRequest.ending = recurringDates[1].toISOString().substring(0,10);
        }
        jsonRequest = JSON.stringify(jsonRequest);
        return encodeURI(jsonRequest);
    }

    const submitForm = () => {
        console.log(formStates)
        const searchParameters = createRideSearchParameters();
        FetchService.get("/rides?searchParams=" + searchParameters).then((results) => {
            console.log(results)
        });
    }

    return (
        <Form fluid>
            <RideFormContextProvider>
                <RideFormInputs />
            </RideFormContextProvider>
            <Form.Group className='flex justify-end my-4'>
                <Button appearance="primary" onClick={submitForm}>Rechercher</Button>
            </Form.Group>
        </Form>
    );
}

export { SearchRidesForm  };