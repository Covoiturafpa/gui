import { React, useState, useRef } from 'react';
import { Form, Checkbox, RadioGroup, Radio, DatePicker, DateRangePicker, Stack, CheckboxGroup } from 'rsuite';
import { BsArrowDownUp } from "react-icons/bs";
import { CheckBoxDays } from './CheckBoxDays';
import { fetchLocation } from '../services/GeoCodingAPI';
import { useContext } from 'react';
import { DestinationContext } from '../scenes/Booking';
import { FormContext } from './SearchRidesForm';

const RideFormInputs = () => {
    const [rideType, setRideType] = useState("O");
    const [arrivalValue, setArrivalValue] = useState("AFPA Rochefort");
    const [departureValue, setDepartureValue] = useState("");
    const [isFromAfpa, setIsFromAfpa] = useState(false);
    const departureInput = useRef();
    const arrivalInput = useRef();
    const { setDestination } = useContext(DestinationContext);
    const formContext = useContext(FormContext);

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
        console.log(formContext)
        const departure = departureInput.current;
        const arrival = arrivalInput.current;
        [departure.name, arrival.name] = [arrival.name, departure.name];

        const prevArrivalValue = arrivalValue;
        setArrivalValue(departureValue);
        setDepartureValue(prevArrivalValue);

        setIsFromAfpa(!isFromAfpa);
        
    }

    return (
        <>
            <Stack wrap >
                <Form.Group controlId='radioRideType'>
                    <Form.Control  accepter={RadioGroup} name="rideType" inline={true} 
                                   value={formContext.rideType.value} onChange={formContext.rideType.setValue} className='mr-4'>
                        <Radio value="O">Ponctuel</Radio>
                        <Radio value="R">Régulier</Radio>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='flex items-center' controlId='checkBoxRoundTrip'>
                    <Form.Control accepter={CheckboxGroup} name="isRoundTrip" value={formContext.isRoundTrip.value} onChange={formContext.isRoundTrip.setValue} >
                        <Checkbox />
                    </Form.Control>
                    <Form.ControlLabel classPrefix='' htmlFor='checkBoxRoundTrip'>Aller&nbsp;retour</Form.ControlLabel>
                </Form.Group>
            </Stack>
            <Form.Group className='pt-2' controlId='inputDeparture'>
                <Form.ControlLabel>Départ</Form.ControlLabel>
                <Form.Control name="departure" ref={departureInput} value={formContext.departure.value} onChange={formContext.departure.setValue}
                    onBlur={updateCoordinates} readOnly={isFromAfpa} />
            </Form.Group>
            <button className="text-xl w-full flex justify-center">
                <BsArrowDownUp onClick={invertDestinationsInputs} />
            </button>
            <Form.Group controlId='inputArrival'>
                <Form.ControlLabel>Arrivée</Form.ControlLabel>
                <Form.Control name="arrival" ref={arrivalInput} value={formContext.arrival.value} onChange={formContext.arrival.setValue}
                    onBlur={updateCoordinates} readOnly={!isFromAfpa} />
            </Form.Group>
            <div className='h-36'>
                {rideType === "O" &&
                    <Form.Group className='pt-3'>
                        <Form.ControlLabel>Date de départ</Form.ControlLabel>
                        <Form.Control name="date" accepter={DatePicker} className='w-full' format="yyyy-MM-dd" 
                                      placeholder={"aaaa-mm-jj"} value={formContext.departureDay.value} onChange={formContext.departureDay.setValue}>
                            <DatePicker />
                        </Form.Control>
                    </Form.Group>
                }
                {rideType === "R" &&
                    <>
                        {/* <Form.Group className='pl-1 pt-3' >
                            <Form.ControlLabel>Jours</Form.ControlLabel>
                            <RadioGroup>
                                <CheckBoxDays days={0} />
                            </RadioGroup>
                        </Form.Group> */}
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
            </div>
        </>
    )
}

export { RideFormInputs }