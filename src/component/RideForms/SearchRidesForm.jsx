import { useContext, useEffect } from 'react';

import { Form, Button } from 'rsuite';

import { RideFormInputs } from './RideFormInputs';
import FetchService from '../../services/FetchService';
import { RideFormContext } from './RideFormContextProvider';

const SearchRidesForm = () => {
    // Récupération de tous les états du "RideFormContext"
    // formStates est le nom du JSON contenant les états et leurs setters
    // dans "RideFormContext"
    const { arrival, departure, departureDay, recurringDates, rideType, isFromAfpa, destination } = useContext(RideFormContext);

    /* useEffect(() => {
        console.log("USE EFFECT DESTINATION !!"); 
    }, [destination.value]); */

    function createRideSearchParameters() {
        // construction de la requête JSON 
        let jsonRequest = {
            "rideType": rideType.value,
            "destination": {
                "isFromAfpa": isFromAfpa.value,
                "latitude": destination.lat.value,
                "longitude": destination.lon.value,
                "city": {
                    "name": (isFromAfpa.value ? arrival.value : departure.value)
                }
            }
        };

        if (departureDay.value !== undefined) {
            jsonRequest.departureDay = departureDay.value.toISOString().substring(0, 10);
        } else {
            jsonRequest.beginning = recurringDates.value[0].toISOString().substring(0, 10);
            jsonRequest.ending = recurringDates.value[1].toISOString().substring(0, 10);
        }
        jsonRequest = JSON.stringify(jsonRequest);
        return encodeURI(jsonRequest);
    }

    const submitForm = () => {
        const searchParameters = createRideSearchParameters();
        FetchService.get("/rides?searchParams=" + searchParameters).then((results) => {
             // console.log(results)
        });
    }

    return (
        <Form fluid>
            <RideFormInputs />
            <Form.Group className='flex justify-end my-4'>
                <Button appearance="primary" onClick={submitForm}>Rechercher</Button>
            </Form.Group>
        </Form>
    );
}

export default SearchRidesForm;