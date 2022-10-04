import { React, useState, useRef } from 'react';
import { Form, Checkbox, RadioGroup, Radio, DatePicker, DateRangePicker, Stack } from 'rsuite';
import FormGroup from 'rsuite/esm/FormGroup';
import { BsArrowDownUp } from "react-icons/bs";
import { CheckBoxDays } from './CheckBoxDays';
import { fetchLocation } from '../services/GeoCodingAPI';
import { useContext } from 'react';
import { DestinationContext } from '../scenes/BookingForm';

const RideFormInputs = () => {
    const [rideType, setRideType] = useState("R");
    const [arrivalValue, setArrivalValue] = useState("AFPA Rochefort");
    const [departureValue, setDepartureValue] = useState("");
    const [isFromAfpa, setIsFromAfpa] = useState(false);
    const departureInput = useRef();
    const arrivalInput = useRef();
    const { destination, setDestination } = useContext(DestinationContext);

    const updateCoordinates = () => {
        let inputValue = departureInput.current.firstChild.value;

        if (isFromAfpa) {
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

        const prevArrivalValue = arrivalValue;
        setArrivalValue(departureValue);
        setDepartureValue(prevArrivalValue);

        setIsFromAfpa(!isFromAfpa);
    }

    const datePickerRanges = [
        {
            label: "Aujourd'hui",
            value: new Date(),
            closeOverlay: true
        },
    ];

    return (
        <>
            <Stack wrap>
                <RadioGroup inline={true} value={rideType} onChange={setRideType} className='mr-4'>
                    <Radio value="O" >Ponctuel</Radio>
                    <Radio value="R" >Régulier</Radio>
                </RadioGroup>
                <Checkbox >Aller retour</Checkbox>
            </Stack>
            <Form.Group className='pt-2' >
                <Form.ControlLabel>Départ</Form.ControlLabel>
                <Form.Control name="departure" value={departureValue} ref={departureInput} onChange={setDepartureValue} 
                              onBlur={updateCoordinates} readOnly={isFromAfpa} />
            </Form.Group>
            <button className="text-xl w-full flex justify-center">
                <BsArrowDownUp onClick={invertDestinationsInputs} />
            </button>
            <Form.Group>
                <Form.ControlLabel>Arrivée</Form.ControlLabel>
                <Form.Control name="arrival" value={arrivalValue} ref={arrivalInput} onChange={setArrivalValue} 
                              onBlur={updateCoordinates} readOnly={!isFromAfpa} />
            </Form.Group>
            <div className='h-36'>
                {rideType === "O" &&
                    <FormGroup className='pt-3'>
                        <Form.ControlLabel>Date de début</Form.ControlLabel>
                        <DatePicker format="yyyy-MM-dd" ranges={datePickerRanges} placeholder={"aaaa-mm-jj"} />
                    </FormGroup>
                }
                {rideType === "R" &&
                    <>
                        <FormGroup className='pl-1 pt-3'>
                            <Form.ControlLabel>Jours</Form.ControlLabel>
                            <RadioGroup>

                                <CheckBoxDays days={0} />
                            </RadioGroup>
                        </FormGroup>
                        <FormGroup className='pt-0'>
                            <Form.ControlLabel>Dates de début -&rsaquo; fin</Form.ControlLabel>
                            <DateRangePicker className='w-full' format="yyyy-MM-dd" ranges={datePickerRanges} character={" -> "}
                                placeholder={"aaaa-mm-jj -> aaaa-mm-jj"} showOneCalendar placement='topStart' />
                        </FormGroup>
                    </>
                }
            </div>
        </>
    )
}

export { RideFormInputs }