import { useContext } from 'react';
import { Form, Button } from 'rsuite';

import RideFormInputs from './RideFormInputs';
import FetchService from '../../services/FetchService';
import { RideFormContext } from './RideFormContextProvider';

const SearchRidesForm = () => {
    const { rideType, isFromAfpa, arrival, departure, departureDay, recurringDates, destination, rides } = useContext(RideFormContext);

    function createRideSearchParameters() {
        let jsonRequest = {
            rideType: rideType.value,
            destination: {
                isFromAfpa: isFromAfpa.value,
                latitude: destination.value.lat,
                longitude: destination.value.lon,
                city: {
                    name: (isFromAfpa.value ? arrival.value : departure.value)
                }
            }
        };

        if (departureDay !== undefined) {
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
            rides.setValue(results);
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