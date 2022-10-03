import { React, useState, useRef } from 'react';
import { Form, Button, Checkbox, RadioGroup, Radio, DatePicker, DateRangePicker, Stack } from 'rsuite';
import { BsArrowDownUp } from "react-icons/bs";
import { CheckBoxDays } from './CheckBoxDays';
import FormGroup from 'rsuite/esm/FormGroup';
import { fetchLocation } from '../services/GeoCodingAPI';
import { useEffect, useContext } from 'react';
import { DestinationContext } from '../scenes/BookingForm';
import FetchService from '../services/FetchService'

const SearchRidesForm = (props) => {
    const [rideType, setRideType] = useState("R");
    const [arrivalValue, setArrivalValue] = useState("AFPA Rochefort");
    const [departureValue, setDepartureValue] = useState("");
    const [isFromAfpa, setIsFromAfpa] = useState(false);
    const departureInput = useRef();
    const arrivalInput = useRef();
    const { destination, setDestination } = useContext(DestinationContext);

    FetchService.get("/users/51/rides").then((data) => {
        console.log(data)
    })

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

    // useEffect(() => {
    //     if (departureInput && departureInput.current) {
    //         console.log("entrée if")
    //         departureInput.current.addEventListener("blur", () => {
    //             console.log(departureInput.current.value)
    //             setDepartureValue(departureInput.current.value);
    //             getCoordinates(departureInput.current.value);
    //         })
    //     }
    // }, [])

    const datePickerRanges = [
        {
            label: "Aujourd'hui",
            value: new Date(),
            closeOverlay: true
        },
    ];

    return (
        <Form fluid>
            <Stack wrap>
                <RadioGroup inline={true} value={rideType} onChange={setRideType} className='mr-4'>
                    <Radio value="O" >Ponctuel</Radio>
                    <Radio value="R" >Régulier</Radio>
                </RadioGroup>
                <Checkbox >Aller retour</Checkbox>
            </Stack>
            <Form.Group className='pt-2' >
                <Form.ControlLabel>Départ</Form.ControlLabel>
                <Form.Control name="departure" value={departureValue} ref={departureInput} onChange={setDepartureValue} onBlur={updateCoordinates} readOnly={isFromAfpa} />
            </Form.Group>
            <button className="text-xl w-full flex justify-center">
                <BsArrowDownUp onClick={invertDestinationsInputs} />
            </button>
            <Form.Group>
                <Form.ControlLabel>Arrivée</Form.ControlLabel>
                <Form.Control name="arrival" value={arrivalValue} ref={arrivalInput} onChange={setArrivalValue} onBlur={updateCoordinates} readOnly={!isFromAfpa} />
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
            <FormGroup className='flex justify-end my-4'>
                <Button appearance="primary" >Rechercher</Button>
            </FormGroup>
        </Form>
    );
}

export { SearchRidesForm };