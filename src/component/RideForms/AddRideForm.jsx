import React from 'react';
import { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Input, Form, Button, DatePicker, SelectPicker, InputNumber, Stack, InputGroup, Whisper, Tooltip, Notification, useToaster, Loader } from 'rsuite';
import InfoIcon from '@rsuite/icons/legacy/Info';
import FetchService from '../../services/FetchService';
import authService from "../../services/AuthService";
import RideFormInputs from './RideFormInputs';
import { DestinationContext } from '../../scenes/Booking';
import { FiPlusCircle } from "react-icons/fi";
import { RideFormContext } from './RideFormContextProvider';
import { DaysTranslate } from '../DaysTranslate';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AddRideForm = (props) => {
    const [carsUser, setCarsUser] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [placeholderCars, setPlaceholderCars] = useState("");
    const { arrival, departure, destination, isFromAfpa, rideType, isRoundTrip, departureDay, recurringDates, beginning, ending, days } = useContext(RideFormContext);
    const [arrivalTime, setArrivalTime] = useState();
    const [arrivalTimeReturn, setArrivalTimeReturn] = useState();
    const [car, setCar] = useState({});
    const [seats, setSeats] = useState();
    const [price, setPrice] = useState();
    const [comment, setComment] = useState();
    const [newRide, setNewRide] = useState({});
    const carInput = useRef();

    const [type, setType] = useState('info');
    const [toastContent, setToastContent] = useState("");
    const toaster = useToaster();

    const message = (
      <Notification className="z-[100000]" type={type} header={type} duration="1800" closable>
        {toastContent}
      </Notification>
    );

    useEffect(() => {
        
        const fetch = FetchService.get("/users/" + userId);
        fetch.then(
            (result) => {
                setDataUser(result);
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
        let dataNewRide = {
            "rideType" : rideType.value,
            "destination" : {
                "latitude" : destination.value.lat,
                "longitude" : destination.value.lon,
                "isFromAfpa" : isFromAfpa.value,
                "city" : {
                    "name" : ( isFromAfpa.value ? arrival.value : departure.value )
                }
            },
            "departureTime" : arrivalTime.toISOString().substring(11, 19),
            "car" : {
                "id" : car.key,
                "person" : {
                    "id" : dataUser.id,
                    "personType" : dataUser.personType
                }
            },
            "price" : price,
            "comment" : comment,
            "isActive" : true
        };
        if (rideType.value === "O") {
            dataNewRide = {...dataNewRide, "departureDay" : departureDay.value.toISOString().substring(0, 10)}
        }else if (rideType.value === "R") {
            dataNewRide = {...dataNewRide, "beginning" : recurringDates.value[0].toISOString().substring(0, 10), "ending" : recurringDates.value[1].toISOString().substring(0, 10), "daysWeek" : days.value}
        }
        const fetchPost = FetchService.post("/rides", JSON.stringify(dataNewRide));
        fetchPost.then((result) => {
            console.log(result);
            if(result.errorMessage) {
                setType("error");
                setToastContent("Vous avez déjà créer un trajet similaire");
                toaster.push(message, { value : 'bottomStart' });
            }else {
                setType("success");
                setToastContent("Le trajet est enregistré");
                toaster.push(message, { value : 'bottomStart' });
            }
        },
        (error) => {
            console.log(error);
            setType("error");
            setToastContent("Une erreur est survenue");
            toaster.push(message, { value : 'bottomStart' });
        });

        if(isRoundTrip.value) {
            const dataRoundTrip = {...dataNewRide,
                                    "destination" : {
                                        "latitude" : destination.value.lat,
                                        "longitude" : destination.value.lon,
                                        "isFromAfpa" : !isFromAfpa.value,
                                        "city" : {
                                            "name" : ( isFromAfpa.value ? arrival.value : departure.value )
                                        }
                                    },
                                    "departureTime" : arrivalTimeReturn.toISOString().substring(11, 19)};
            console.log(dataRoundTrip);
            const fetchPost = FetchService.post("/rides", JSON.stringify(dataRoundTrip));
            fetchPost.then((result) => {
                console.log(result);
            })
        }
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div className=' h-full flex justify-center items-center'><Loader size="sm" content="Chargement..." /></div>;
    } else {
        return (
            <div>
                <Form fluid>
                    <RideFormInputs />
                    <div className='flex justify-between'>
                        <Form.Group className="mb-[24px]" controlId='inputArrivalTime'>
                            <Form.ControlLabel>Heure de départ *</Form.ControlLabel>
                            <DatePicker placement="auto" name="arrivalTimeInput" format="HH:mm" onChange={setArrivalTime} required/>
                        </Form.Group>
                        {isRoundTrip.value ?
                            <Form.Group controlId='inputArrivalTimeReturn'>
                                <Form.ControlLabel>Heure de départ retour *</Form.ControlLabel>
                                <DatePicker placement="autoVerticalEnd" name="arrivalTimeReturnInput" format="HH:mm" onChange={setArrivalTimeReturn} required/>
                            </Form.Group>
                            : ""}
                    </div>
                    <div className="flex w-full">
                        <Form.Group className='w-full' controlId='inputChoiceCar'>
                            <Form.ControlLabel>Choix du véhicule : *</Form.ControlLabel>
                            <SelectPicker ref={carInput} name="carInput" data={carsUser} block placeholder={placeholderCars} onSelect={(value, item) => { setCar(item); setSeats(item.seats)}} required/>
                        </Form.Group>
                        <Button className="h-[36px] self-center" color="green" appearance="subtle">
                            <FiPlusCircle className="text-xl " />
                        </Button>
                    </div>
                    <Form.Group controlId='inputSeats'>
                        <Form.ControlLabel>Nombre de places *</Form.ControlLabel>
                        <InputNumber value={seats} name="seatsInput" onChange={setSeats} required/>
                    </Form.Group>
                    <Form.Group controlId='inputPrice'>
                        <Form.ControlLabel>Prix *</Form.ControlLabel>
                        <InputGroup inside>
                            <Input name="priceInput" onChange={setPrice} type='integer'/>
                            <InputGroup.Addon>
                                <Whisper placement="top" speaker={<Tooltip> Help information</Tooltip>} required>
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
                        <Button appearance="primary" onClick={submitForm}>Enregistrer</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export { AddRideForm }; 