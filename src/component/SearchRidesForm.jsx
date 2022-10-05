import { useState, createContext } from 'react';
import { Form, Button } from 'rsuite';
import { RideFormInputs } from './RideFormInputs';

const FormContext = createContext();

const SearchRidesForm = (props) => {

    const [departureDay, setDepartureDay] = useState();
    const [recurringDates, setRecurringDates] = useState();
    const [arrival, setArrival] = useState("AFPA Rochefort");
    const [departure, setDeparture] = useState();
    const [rideType, setRideType] = useState();
    const [isRoundTrip, setIsRoundTrip] = useState();

    const formStates = {
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

    const submitForm = () => {
        console.log(formStates);
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