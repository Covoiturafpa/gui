import { useContext } from 'react';
import { Form, Button } from 'rsuite';
import RideFormInputs from "./RideFormInputs";
import FetchService from '../../services/FetchService';
import { RideFormContext } from './RideFormContextProvider';

const SearchRidesForm = () => {
    const [rideType, isFromAfpa, arrival, departure, departureDay, recurringDates, destination] = useContext(RideFormContext);
    
    function createRideSearchParameters() {
        let jsonRequest = {
            rideType: rideType,
            destination: {
                isFromAfpa: isFromAfpa,
                latitude: destination.lat,
                longitude: destination.lon,
                city: {
                    name: (isFromAfpa ? arrival : departure)
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
        const searchParameters = createRideSearchParameters();
        FetchService.get("/rides?searchParams=" + searchParameters).then((results) => {
            console.log(results)
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