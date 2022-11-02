import { useContext, useState, useRef, useEffect } from 'react';
import { Form, Button } from 'rsuite';

import RideFormInputs from './RideFormInputs';
import FetchService from '../../services/FetchService';
import { RideFormContext } from './RideFormContextProvider';
import { searchRideForm, oneTimeForm, recurringForm } from '../../services/SchemaType';

const SearchRidesForm = () => {
    const { rideType, isFromAfpa, isRoundTrip, arrival, departure, departureDay, days, recurringDates, destination, rides } = useContext(RideFormContext);
    const [formValues, setFormValues] = useState({});
    const formRef = useRef();

    const defaultFormValues = {
        "rideType" : rideType.value,
        "isRoundTrip" : isRoundTrip.value,
        "isFromAfpa" : isFromAfpa.value,
        "departure": departure.value,
        "arrival": arrival.value,
        "date" : departureDay.value,
        "dates" : recurringDates.value,
        "days" : days.value
    }

    useEffect(() => {
        formRef.current.cleanErrors();
    }, [rideType.value])

    useEffect(() => {
        formRef.current.cleanErrorForField("isRoundTrip");
    }, [isRoundTrip.value])

    useEffect(() => {
        formRef.current.cleanErrorForField("isFromAfpa");
    }, [isFromAfpa.value])

    useEffect(() => {
        formRef.current.cleanErrorForField("departure");
    }, [departure.value])

    useEffect(() => {
        formRef.current.cleanErrorForField("arrival");
    }, [arrival.value])

    useEffect(() => {
        formRef.current.cleanErrorForField("date");
    }, [departureDay.value])

    useEffect(() => {
        formRef.current.cleanErrorForField("dates");
    }, [recurringDates.value])

    useEffect(() => {
        if (days.value !== formValues.days) {
            setFormValues({...formValues, "days" : days.value });
            formRef.current.cleanErrorForField("days");
        }
    }, [days.value, formValues])

    useEffect(() => {
        if (Object.keys(formValues).length === 0) {
            setFormValues(defaultFormValues);
        }
    }, [formValues])

    function createRideSearchParameters(invertDestination) {
        let jsonRequest = {
            rideType: rideType.value,
            destination: {
                isFromAfpa: (invertDestination ? !isFromAfpa.value : isFromAfpa.value),
                latitude: destination.value.lat,
                longitude: destination.value.lon,
                city: {
                    name: (isFromAfpa.value ? arrival.value : departure.value)
                }
            }
        };
        if (rideType.value === "R") {
            jsonRequest.daysWeek = days.value;
            jsonRequest.beginning = recurringDates.value[0].toISOString().substring(0, 10);
            jsonRequest.ending = recurringDates.value[1].toISOString().substring(0, 10);
        }
        if (rideType.value === "O") {
            jsonRequest.departureDay = departureDay.value.toISOString().substring(0, 10);
        }
        jsonRequest = JSON.stringify(jsonRequest);
        return encodeURI(jsonRequest);
    }

    const checkFormErrors = () => {
        let formErrors = null;
        if (rideType.value === "O") {
            formErrors = oneTimeForm.check(formValues); 
        }
        if (rideType.value === "R") {
            formErrors = recurringForm.check(formValues);
        }
        let isErrorFound = false;
        for (const [key, value] of Object.entries(formErrors)) {
            if (key && value.hasError) {
                isErrorFound = true;
            }
        }
        return isErrorFound;
    }

    const submitForm = () => {
        if (!checkFormErrors()) {
            let searchParameters = createRideSearchParameters(false);
            FetchService.get("/rides?searchParams=" + searchParameters).then((searchResults) => {
                let results = [];
                results.push(searchResults);
                if (isRoundTrip.value) {
                    searchParameters = createRideSearchParameters(true);
                    FetchService.get("/rides?searchParams=" + searchParameters).then((searchResults) => {
                        results.push(searchResults);
                        rides.setValue(results);
                    });
                } else {
                    rides.setValue(results);
                }
            });
        }
    }


    return (
        <Form fluid model={searchRideForm} checkTrigger='none' formValue={defaultFormValues} onChange={setFormValues} ref={formRef}>
            <RideFormInputs />
            <Form.Group className='flex justify-end my-4'>
                <Button appearance="primary" type="submit" onClick={submitForm}>Rechercher</Button>
            </Form.Group>
        </Form>
    );
}

export default SearchRidesForm;