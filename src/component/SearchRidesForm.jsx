import { useState, createContext, useContext } from 'react';
import { Form, Button } from 'rsuite';
import { RideFormInputs } from './RideFormInputs';
import FetchService from '../services/FetchService';
import { DestinationContext } from '../scenes/Booking';

const FormContext = createContext();

const SearchRidesForm = () => {

    const [departureDay, setDepartureDay] = useState();
    const [recurringDates, setRecurringDates] = useState();
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [rideType, setRideType] = useState();
    const [isFromAfpa, setIsFromAfpa] = useState(false);
    const [isRoundTrip, setIsRoundTrip] = useState();
    const { destination } = useContext(DestinationContext);

    // TODO : checkboxdays
    const formStates = {
        isFromAfpa : {
            value : isFromAfpa,
            setValue: setIsFromAfpa
        },
        isRoundTrip : {
            value: isRoundTrip,
            setValue: setIsRoundTrip
        },
        rideType : {
            value: rideType,
            setValue: setRideType
        },
        arrival : {
            value: arrival,
            setValue: setArrival
        },
        departure : {
            value: departure,
            setValue: setDeparture
        },
        departureDay : {
            value: departureDay,
            setValue: setDepartureDay
        },
        recurringDates : {
            value: recurringDates,
            setValue: setRecurringDates
        }   
    };

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
        console.log(formStates)
        const searchParameters = createRideSearchParameters();
        FetchService.get("/rides?searchParams=" + searchParameters).then((results) => {
            console.log(results)
        });
    }

    return (
        <Form fluid>
            <FormContext.Provider value={formStates}>
                <RideFormInputs />
            </FormContext.Provider>
            <Form.Group className='flex justify-end my-4'>
                <Button appearance="primary" onClick={submitForm}>Rechercher</Button>
            </Form.Group>
        </Form>
    );
}

export { SearchRidesForm, FormContext };