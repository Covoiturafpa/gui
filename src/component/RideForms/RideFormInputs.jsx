import { React, useState, useRef, useEffect, useContext } from 'react';
import { Form, RadioGroup, Radio, DatePicker, DateRangePicker, Stack, Divider, CheckboxGroup } from 'rsuite';
import { BsArrowDownUp } from "react-icons/bs";
import { addDays } from 'date-fns';

import CheckBoxDays from '../CheckBoxDays/CheckBoxDays';

import { fetchLocation } from '../../services/GeoCodingAPI';
import FetchService from "../../services/FetchService";
import { RideFormContext } from './RideFormContextProvider';

const RideFormInputs = () => {

    const departureInputRef = useRef();
    const arrivalInputRef = useRef();
    const { arrival, departure, destination, isFromAfpa, rideType, isRoundTrip, departureDay, recurringDates, days } = useContext(RideFormContext);

    useEffect(() => {
        FetchService.get("/centre").then((data) => {
            arrival.setValue(data.name);
        })
    }, [])

    const updateCoordinates = () => {
        let inputValue = departure.value;

        if (isFromAfpa.value) {
            inputValue = arrival.value;
        }

        fetchLocation(inputValue).then((res) => {
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
        const departureInput = departureInputRef.current;
        const arrivalInput = arrivalInputRef.current;
        [departureInput.name, arrivalInput.name] = [arrivalInput.name, departureInput.name];

        const prevArrivalValue = arrival.value;
        arrival.setValue(departure.value);
        departure.setValue(prevArrivalValue);
        isFromAfpa.setValue(!isFromAfpa.value);
    }

    const OneDateRanges = [
        {
            label: "aujourd'hui",
            value: new Date(),
            closeOverlay: true
        },
        {
            label: 'demain',
            value: addDays(new Date(), +1),
            closeOverlay: true
        }
    ];

    const MultipleDatesRanges = [
    ];

    return (
        <>
            <Stack wrap alignItems='baseline' justifyContent='space-around'>
                <Form.Group className='flex justify-center items-center' controlId='radioRideType'>
                    <Form.Control style={{ width: 220 }} accepter={RadioGroup} name="rideType" inline appearance="picker"
                        value={rideType.value} onChange={rideType.setValue} className='my-2 justify-center'>
                        <Radio value="R">Régulier</Radio>
                        <Divider className="self-center" vertical />
                        <Radio value="O">Ponctuel</Radio>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='flex justify-center items-center' controlId='checkBoxRoundTrip'>
                    <Form.Control style={{ width: 220 }} accepter={RadioGroup} inline appearance="picker" name="isRoundTrip" value={isRoundTrip.value}
                        onChange={isRoundTrip.setValue} className='my-2 justify-center'>
                        <Radio value={true} >Aller&nbsp;retour</Radio>
                        <Divider className="self-center" vertical />
                        <Radio value={false}>Aller&nbsp;simple</Radio>
                    </Form.Control>
                </Form.Group>
            </Stack>

            <Form.Group className='pt-2' controlId='inputDeparture'>
                <Form.ControlLabel>Départ</Form.ControlLabel>
                <Form.Control name="departure" ref={departureInputRef} value={departure.value}
                    onChange={departure.setValue}
                    onBlur={updateCoordinates} readOnly={isFromAfpa.value} />
            </Form.Group>
            <button className="text-xl w-full flex justify-center">
                <BsArrowDownUp onClick={invertDestinationsInputs} />
            </button>
            <Form.Group controlId='inputArrival'>
                <Form.ControlLabel>Arrivée</Form.ControlLabel>
                <Form.Control name="arrival" ref={arrivalInputRef} value={arrival.value}
                    onChange={arrival.setValue}
                    onBlur={updateCoordinates} readOnly={!isFromAfpa.value} />
            </Form.Group>
            {rideType.value === "O" &&
                <Form.Group className='pt-3'>
                    <Form.ControlLabel>Date de départ</Form.ControlLabel>
                    <Form.Control name="date" accepter={DatePicker} className='w-full' format="dd-MM-yyyy"
                        placeholder={"jj-mm-aaaa"} value={departureDay.value} oneTap ranges={OneDateRanges}
                        onChange={departureDay.setValue} placement="autoVerticalStart">
                        <DatePicker />
                    </Form.Control>
                </Form.Group>
            }
            {rideType.value === "R" &&
                <>
                    <Form.Group className='pl-1 pt-3' >
                        <Form.ControlLabel>Jours</Form.ControlLabel>
                        <Form.Control name="days" accepter={CheckBoxDays} disabled={false} days={0} value={days.value} onChange={days.setValue}>
                            <CheckBoxDays />
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='pt-0'>
                        <Form.ControlLabel>Dates de début -&rsaquo; fin</Form.ControlLabel>
                        <Form.Control name="dates" accepter={DateRangePicker} className='w-full' format="dd-MM-yyyy" character={" -> "}
                            placeholder={"jj-mm-aaaa -> jj-mm-aaaa"} showOneCalendar placement='autoVerticalStart'
                            value={recurringDates.value} onChange={recurringDates.setValue} ranges={MultipleDatesRanges}>
                            <DateRangePicker />
                        </Form.Control>
                    </Form.Group>
                </>
            }
        </>
    )
}

export default RideFormInputs;