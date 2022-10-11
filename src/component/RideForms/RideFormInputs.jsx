import { React, useState, useRef, useEffect, createContext, useContext } from 'react';
import { Form, RadioGroup, Radio, DatePicker, DateRangePicker, Stack, Divider } from 'rsuite';
import { BsArrowDownUp } from "react-icons/bs";

import CheckBoxDays from '../CheckBoxDays/CheckBoxDays';
import CheckBoxDaysContext from '../CheckBoxDays/CheckBoxDaysContext';

import { fetchLocation } from '../../services/GeoCodingAPI';
import FetchService from "../../services/FetchService";
import { RideFormContext } from './RideFormContextProvider';

const RideFormInputs = () => {
    const [afpaName, setAfpaName] = useState("");
    const [dataDays, setDataDays] = useState([]);

    const departureInput = useRef();
    const arrivalInput = useRef();

    const { arrival, departure, destination, isFromAfpa, rideType, isRoundTrip, departureDay, recurringDates } = useContext(RideFormContext);

    useEffect(() => {
        FetchService.get("/centre").then((data) => {
            setAfpaName(data.name);
            arrival.setValue(data.name);
        })
    }, [])

    const updateCoordinates = () => {
        console.log("UPDATING COORDINATES");
        let inputValue = departureInput.current.firstChild.value;

        if (isFromAfpa.value) {
            inputValue = arrivalInput.current.firstChild.value;
        }

        fetchLocation(inputValue).then((res) => {
            console.log("RESULTAT WESH");
            if (res) {
                destination.setValue({
                    lat: res[0].lat,
                    lon: res[0].lon
                });
            } else {
                destination.setValue({
                    lat: null,
                    lon: null
                });
            }
        });
    }

    const invertDestinationsInputs = () => {
        const departure = departureInput.current;
        const arrival = arrivalInput.current;
        [departure.name, arrival.name] = [arrival.name, departure.name];

        const prevArrivalValue = arrival.value;
        arrival.setValue(departure.value);
        departure.setValue(prevArrivalValue);
        isFromAfpa.setValue(!isFromAfpa.value);  
    }

    return (
        <>
            <Stack wrap alignItems='baseline' justifyContent='space-around'>
                <Form.Group className='flex justify-center items-center' controlId='radioRideType'>
                    <Form.Control style={{width: 220}} accepter={RadioGroup} name="rideType" inline appearance="picker" 
                                value={rideType.value} onChange={rideType.setValue} className='my-2 justify-center'>
                        <Radio value="R">Régulier</Radio>
                        <Divider className="self-center" vertical/>
                        <Radio value="O">Ponctuel</Radio>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='flex justify-center items-center' controlId='checkBoxRoundTrip'>
                    <Form.Control style={{width: 220}} accepter={RadioGroup} inline appearance="picker" name="isRoundTrip" value={isRoundTrip.value} 
                                    onChange={isRoundTrip.setValue} className='my-2 justify-center'>
                            <Radio value={true} >Aller&nbsp;retour</Radio>
                            <Divider className="self-center" vertical/>
                            <Radio value={false}>Aller&nbsp;simple</Radio>
                    </Form.Control>
                </Form.Group>
            </Stack>

            <Form.Group className='pt-2' controlId='inputDeparture'>
                <Form.ControlLabel>Départ</Form.ControlLabel>
                <Form.Control name="departure" ref={departureInput} value={departure.value} 
                              onChange={departure.setValue}
                              onBlur={updateCoordinates} readOnly={isFromAfpa.value} />
            </Form.Group>
            <button className="text-xl w-full flex justify-center">
                <BsArrowDownUp onClick={invertDestinationsInputs} />
            </button>
            <Form.Group controlId='inputArrival'>
                <Form.ControlLabel>Arrivée</Form.ControlLabel>
                <Form.Control name="arrival" ref={arrivalInput} value={arrival.value} 
                              onChange={arrival.setValue}
                              onBlur={updateCoordinates} readOnly={!isFromAfpa.value} />
            </Form.Group>
                {rideType.value === "O" &&
                    <Form.Group className='pt-3'>
                        <Form.ControlLabel>Date de départ</Form.ControlLabel>
                        <Form.Control name="date" accepter={DatePicker} className='w-full' format="yyyy-MM-dd" 
                                      placeholder={"aaaa-mm-jj"} value={departureDay.value} 
                                      onChange={departureDay.setValue}>
                            <DatePicker />
                        </Form.Control>
                    </Form.Group>
                }
                {rideType.value === "R" &&
                    <>
                        <Form.Group className='pl-1 pt-3' >
                            <Form.ControlLabel>Jours</Form.ControlLabel>
                            <RadioGroup>
                                <CheckBoxDaysContext.Provider value={{ dataDays, setDataDays}}>
                                    <CheckBoxDays disabled={false} days={0} />
                                </CheckBoxDaysContext.Provider>
                            </RadioGroup>
                        </Form.Group>
                        <Form.Group className='pt-0'>
                            <Form.ControlLabel>Dates de début -&rsaquo; fin</Form.ControlLabel>
                            <Form.Control name="dates" accepter={DateRangePicker} className='w-full' format="yyyy-MM-dd" character={" -> "}
                                placeholder={"aaaa-mm-jj -> aaaa-mm-jj"} showOneCalendar placement='topStart'
                                value={recurringDates.value} onChange={recurringDates.setValue}>
                            <DateRangePicker />
                            </Form.Control>
                        </Form.Group>
                    </>
                }
        </>
    )
}

export default RideFormInputs;