import React from 'react';
import { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Input, Form, Button, DatePicker, SelectPicker, InputNumber, Stack, InputGroup, Whisper, Tooltip } from 'rsuite';
import InfoIcon from '@rsuite/icons/legacy/Info';
import FetchService from '../../services/FetchService';
import authService from "../../services/AuthService";
import RideFormInputs from './RideFormInputs';
import { DestinationContext } from '../../scenes/Booking';
import { FiPlusCircle } from "react-icons/fi";
import { RideFormContext } from './RideFormContextProvider';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AddRideForm = (props) => {
    const [dataDays, setDataDays] = useState([]);
    const [carsUser, setCarsUser] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [placeholderCars, setPlaceholderCars] = useState("");
    const { arrival, departure, destination, isFromAfpa, rideType, isRoundTrip, departureDay, recurringDates } = useContext(RideFormContext);
    const [arrivalTime, setArrivalTime] = useState();
    const [arrivalTimeReturn, setArrivalTimeReturn] = useState();
    const [car, setCar] = useState({});
    const [seats, setSeats] = useState();
    const [price, setPrice] = useState();
    const [comment, setComment] = useState();
    const [newRide, setNewRide] = useState({});
    const carInput = useRef();

      
    useEffect(() => {
        const fetch = FetchService.get("/users/" + userId);
        fetch.then(
            (result) => {
                setDataUser(result);
                console.log(result);
                const dataResult = result.cars.map(
                    car => ({ label: car.model, value: car.model, key: car.id, seats: car.seats, avgFuelConsumption : car.avgFuelConsumption, idCarType : car.idCarType, idPerson: car.idPerson})
                );
                setCarsUser(dataResult);
                if (dataResult.length == 0) {
                    setPlaceholderCars("Vous posséder aucune voiture");
                }
                if(result.endContract) {
                }
                if(result.endTraining) {
                }
                setIsLoaded(true);
            },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        )
    }, []);

    const submitForm = () => {
        const dataNewRide = {
            "rideType" : rideType.value,
            "departure" : departure.value,
            "destination" : {
                "latitude" : 0,
                "longitude" : 0,
                "isFromAfpa" : isFromAfpa.value,
                "city" : {
                    "id" : 0,
                    "name" : 0
                }
            },
            "departureDay" : departureDay.value,
            "recurringDates" : recurringDates.value,
            "departureTime" : arrivalTime,
            "car" : {
                "id" : car.key,
                "model" : car.label,
                "seats" : car.seats,
                "avgFuelConsumption" : car.avgFuelConsumption,
                "idCarType" : car.idCarType,
                "idPerson" : car.idPerson
            },
            "price" : price,
            "comment" : comment
        };
        if(isRoundTrip) {
            const dataRoundTrip = {...dataNewRide, "departure" : arrival.value, "isFromAfpa" : !isFromAfpa.value, "departureTime" : arrivalTimeReturn.value};
            const fetchPost = FetchService.post("/rides", dataRoundTrip);
            fetchPost.then((result) => {
                console.log(result);
            })
        }
        const fetchPost = FetchService.post("/rides", dataNewRide)
        fetchPost.then((result) => {
            console.log(result);
        });
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <Form fluid>
                <RideFormInputs />
                <div className='flex justify-between'>
                    <Form.Group className="mb-[24px]" controlId='inputArrivalTime'>
                        <Form.ControlLabel>Heure de départ</Form.ControlLabel>
                        <DatePicker name="arrivalTimeInput" format="HH:mm" onChange={setArrivalTime}/>
                    </Form.Group>
                    {isRoundTrip.value ?
                        <Form.Group controlId='inputArrivalTimeReturn'>
                            <Form.ControlLabel>Heure de départ retour</Form.ControlLabel>
                            <DatePicker name="arrivalTimeReturnInput" format="HH:mm" onChange={setArrivalTimeReturn}/>
                        </Form.Group>
                        : ""}
                </div>
                <div className="flex w-full">
                    <Form.Group className='w-full' controlId='inputChoiceCar'>
                        <Form.ControlLabel>Choix du véhicule :</Form.ControlLabel>
                        <SelectPicker ref={carInput} name="carInput" data={carsUser} block placeholder={placeholderCars} onSelect={(value, item) => { setCar(item); setSeats(item.seats)}}/>
                    </Form.Group>
                    <Button className="h-[36px] self-center" color="green" appearance="subtle">
                        <FiPlusCircle className="text-xl " />
                    </Button>
                </div>
                <Form.Group controlId='inputSeats'>
                    <Form.ControlLabel>Nombre de places</Form.ControlLabel>
                    <InputNumber value={seats} name="seatsInput" onChange={setSeats}/>
                </Form.Group>
                <Form.Group controlId='inputPrice'>
                    <Form.ControlLabel>Prix</Form.ControlLabel>
                    <InputGroup inside>
                        <Input name="priceInput" onChange={setPrice} type='integer'/>
                        <InputGroup.Addon>
                            <Whisper placement="top" speaker={<Tooltip> Help information</Tooltip>}>
                            <InfoIcon />
                            </Whisper>
                        </InputGroup.Addon>
                    </InputGroup>
                    
                </Form.Group>
                <Form.Group controlId='inputComment'>
                    <Form.ControlLabel>Commentaire</Form.ControlLabel>
                    <Form.Control name="commentInput" rows={5} accepter={Textarea} onChange={setComment}/>
                </Form.Group>
                <Form.Group className='flex justify-end my-4'>
                    <Button appearance="primary" onClick={submitForm}>Envoyer</Button>
                </Form.Group>
            </Form>
        );
    }
}

export { AddRideForm }; 