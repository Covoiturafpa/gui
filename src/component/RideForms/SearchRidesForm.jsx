import { useContext } from 'react';
import { Form, Button } from 'rsuite';

import RideFormInputs from './RideFormInputs';
import FetchService from '../../services/FetchService';
import { RideFormContext } from './RideFormContextProvider';

const SearchRidesForm = () => {
    const { rideType, isFromAfpa, isRoundTrip, arrival, departure, departureDay, days, recurringDates, destination, rides } = useContext(RideFormContext);
    const data = useContext(RideFormContext);

    function createRideSearchParameters() {
        console.log(data)
        let jsonRequest = {
            rideType: rideType.value,
            destination: {
                isFromAfpa: (isRoundTrip.value ? !isFromAfpa.value : isFromAfpa.value),
                latitude: destination.value.lat,
                longitude: destination.value.lon,
                city: {
                    name: (isFromAfpa.value ? arrival.value : departure.value)
                }
            }
        };
        if (rideType.value === "R") {
            jsonRequest.daysWeek = days.value;
        }
        if (departureDay.value !== undefined) {
            jsonRequest.departureDay = departureDay.value.toISOString().substring(0, 10);
        } else {
            jsonRequest.beginning = recurringDates.value[0].toISOString().substring(0, 10);
            jsonRequest.ending = recurringDates.value[1].toISOString().substring(0, 10);
            
        }
        console.log(jsonRequest);
        jsonRequest = JSON.stringify(jsonRequest);
        return encodeURI(jsonRequest);
    }

    const submitForm = () => { 
        let searchParameters = createRideSearchParameters(false);
        FetchService.get("/rides?searchParams=" + searchParameters).then((results) => {
            rides.setValue(results);
        });
        if (isRoundTrip.value) {
            searchParameters = createRideSearchParameters(true);
            FetchService.get("/rides?searchParams=" + searchParameters).then((results) => {
                rides.setValue(...rides.value, results);
                console.log(rides.value)
            });
        }
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