import { useState, createContext } from 'react';

const RideFormContext = createContext();

const RideFormContextProvider = ({ children }) => {
    const [departureDay, setDepartureDay] = useState();
    const [recurringDates, setRecurringDates] = useState();
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [rideType, setRideType] = useState("R");
    const [isFromAfpa, setIsFromAfpa] = useState(false);
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [destination, setDestination] = useState({ lat: null, lon: null });
    const [rides, setRides] = useState([]);

    const formStates = {
        "isFromAfpa": {
            value: isFromAfpa,
            setValue: setIsFromAfpa
        },
        "isRoundTrip": {
            value: isRoundTrip,
            setValue: setIsRoundTrip
        },
        "rideType": {
            value: rideType,
            setValue: setRideType
        },
        "arrival": {
            value: arrival,
            setValue: setArrival
        },
        "departure": {
            value: departure,
            setValue: setDeparture
        },
        "departureDay": {
            value: departureDay,
            setValue: setDepartureDay
        },
        "recurringDates": {
            value: recurringDates,
            setValue: setRecurringDates
        },
        "destination": {
            value: destination,
            setValue: setDestination
        },
        "rides": {
            value: rides,
            setValue: setRides
        }
    };
    return (
        <RideFormContext.Provider value={formStates}>
            {children}
        </RideFormContext.Provider>
    );
}

export { RideFormContextProvider, RideFormContext };