import { useState, createContext} from 'react';

const FormContext = createContext();

const RideFormContextProvider = ({ children }) => {
    const [departureDay, setDepartureDay] = useState();
    const [recurringDates, setRecurringDates] = useState();
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [rideType, setRideType] = useState("R");
    const [isFromAfpa, setIsFromAfpa] = useState(false);
    const [isRoundTrip, setIsRoundTrip] = useState(true);
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
    return (
        <FormContext.Provider value={formStates}>
            {children}
        </FormContext.Provider>
    );
}

export { RideFormContextProvider, FormContext};