import React, { useState, useRef, useEffect, createContext } from 'react';
import { Form, Checkbox, RadioGroup, Radio, DatePicker, DateRangePicker, Stack, Divider } from 'rsuite';
import { BsArrowDownUp } from "react-icons/bs";
import { CheckBoxDays } from './CheckBoxDays';
import { fetchLocation } from '../services/GeoCodingAPI';
import { useContext } from 'react';
import { DestinationContext } from '../scenes/Booking';
import { FormContext } from './SearchRidesForm';
import FetchService from "../services/FetchService";

const CheckboxDaysContext = createContext();


const RideFormInputs = () => {
    const [afpaName, setAfpaName] = useState("");
    const departureInput = useRef();
    const arrivalInput = useRef();
    const { setDestination } = useContext(DestinationContext);
    const formContext = useContext(FormContext);
    const [dataDays, setDataDays] = useState([]);

    useEffect(() => {
        FetchService.get("/centre").then((data) => {
            setAfpaName(data.name);
            formContext.arrival.setValue(data.name);
        })
    }, [])


    const updateCoordinates = () => {
        let inputValue = departureInput.current.firstChild.value;

        if (formContext.isFromAfpa.value) {
            inputValue = arrivalInput.current.firstChild.value;
        }
        fetchLocation(inputValue).then((res) => {
            if (res) {
                setDestination({
                    lat: res[0].lat,
                    lon: res[0].lon
                });
            } else {
                setDestination({
                    lat: null,
                    lon: null
                })
            }
        });
    }

    const invertDestinationsInputs = () => {
        const departure = departureInput.current;
        const arrival = arrivalInput.current;
        [departure.name, arrival.name] = [arrival.name, departure.name];

        const prevArrivalValue = formContext.arrival.value;
        formContext.arrival.setValue(formContext.departure.value);
        formContext.departure.setValue(prevArrivalValue);
        formContext.isFromAfpa.setValue(!formContext.isFromAfpa.value);  
    }

    return (
        <>
            <Stack wrap alignItems='baseline' justifyContent='space-around'>
                <Form.Group className='flex justify-center items-center' controlId='radioRideType'>
                    <Form.Control style={{width: 220}} accepter={RadioGroup} name="rideType" inline appearance="picker" 
                                value={formContext.rideType.value} onChange={formContext.rideType.setValue} className='my-2 justify-center'>
                        <Radio value="R">Régulier</Radio>
                        <Divider className="self-center" vertical/>
                        <Radio value="O">Ponctuel</Radio>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='flex justify-center items-center' controlId='checkBoxRoundTrip'>
                    <Form.Control style={{width: 220}} accepter={RadioGroup} inline appearance="picker" name="isRoundTrip" value={formContext.isRoundTrip.value} 
                                    onChange={formContext.isRoundTrip.setValue} className='my-2 justify-center'>
                            <Radio value={true} >Aller&nbsp;retour</Radio>
                            <Divider className="self-center" vertical/>
                            <Radio value={false}>Aller&nbsp;simple</Radio>
                    </Form.Control>
                </Form.Group>
            </Stack>
            <Form.Group className='pt-2' controlId='inputDeparture'>
                <Form.ControlLabel>Départ</Form.ControlLabel>
                <Form.Control name="departure" ref={departureInput} value={formContext.departure.value} 
                              onChange={formContext.departure.setValue}
                              onBlur={updateCoordinates} readOnly={formContext.isFromAfpa.value} />
            </Form.Group>
            <button className="text-xl w-full flex justify-center">
                <BsArrowDownUp onClick={invertDestinationsInputs} />
            </button>
            <Form.Group controlId='inputArrival'>
                <Form.ControlLabel>Arrivée</Form.ControlLabel>
                <Form.Control name="arrival" ref={arrivalInput} value={formContext.arrival.value} 
                              onChange={formContext.arrival.setValue}
                              onBlur={updateCoordinates} readOnly={!formContext.isFromAfpa.value} />
            </Form.Group>
                {formContext.rideType.value === "O" &&
                    <Form.Group className='pt-3'>
                        <Form.ControlLabel>Date de départ</Form.ControlLabel>
                        <Form.Control name="date" accepter={DatePicker} className='w-full' format="yyyy-MM-dd" 
                                      placeholder={"aaaa-mm-jj"} value={formContext.departureDay.value} 
                                      onChange={formContext.departureDay.setValue}>
                            <DatePicker />
                        </Form.Control>
                    </Form.Group>
                }
                {formContext.rideType.value === "R" &&
                    <>
                        <Form.Group className='pl-1 pt-3' >
                            <Form.ControlLabel>Jours</Form.ControlLabel>
                            <RadioGroup>
                                <CheckboxDaysContext.Provider value={{ dataDays, setDataDays}}>
                                    <CheckBoxDays disabled={false} days={0} />
                                </CheckboxDaysContext.Provider>
                            </RadioGroup>
                        </Form.Group>
                        <Form.Group className='pt-0'>
                            <Form.ControlLabel>Dates de début -&rsaquo; fin</Form.ControlLabel>
                            <Form.Control name="dates" accepter={DateRangePicker} className='w-full' format="yyyy-MM-dd" character={" -> "}
                                placeholder={"aaaa-mm-jj -> aaaa-mm-jj"} showOneCalendar placement='topStart'
                                value={formContext.recurringDates.value} onChange={formContext.recurringDates.setValue}>
                            <DateRangePicker />
                            </Form.Control>
                        </Form.Group>
                    </>
                }
        </>
    )
}

export { CheckboxDaysContext, RideFormInputs }