import React from 'react';
import { useState, useContext, useEffect, useRef } from 'react';
import { Input, Form, Button, DatePicker, SelectPicker, InputNumber, Stack, InputGroup, Whisper, Tooltip, useToaster, Loader } from 'rsuite';
import InfoIcon from '@rsuite/icons/legacy/Info';
import FetchService from '../../services/FetchService';
import authService from "../../services/AuthService";
import RideFormInputs from './RideFormInputs';
import { FiPlusCircle } from "react-icons/fi";
import { RideFormContext } from './RideFormContextProvider';
import { ToastMessage } from '../ToastMessage';
import { useNavigate } from 'react-router-dom';
import { addRideForm, addOneTimeTrip, addOneTimeRoundTrip, addRecurringTrip, addRecurringRoundTrip } from '../../services/SchemaType';




const AddRideForm = (props) => {
    const [carsUser, setCarsUser] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [placeholderCars, setPlaceholderCars] = useState("");
    const { arrival, departure, destination, isFromAfpa, rideType, isRoundTrip, departureDay, recurringDates, days } = useContext(RideFormContext);
    const [arrivalTime, setArrivalTime] = useState(null);
    const [arrivalTimeReturn, setArrivalTimeReturn] = useState(null);
    const [car, setCar] = useState();
    const [carName, setCarName] = useState();
    const [seats, setSeats] = useState(3);
    const [price, setPrice] = useState(0);
    const [comment, setComment] = useState("");
    const toaster = useToaster();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const addRideFormRef = useRef();

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrors();
        }
    }, [rideType.value])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("isRoundTrip");
        }
    }, [isRoundTrip.value])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("isFromAfpa");
        }
    }, [isFromAfpa.value])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("departure");
        }
    }, [departure.value])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("arrival");
        }
    }, [arrival.value])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("date");
        }
    }, [departureDay.value])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("dates");
        }
    }, [recurringDates.value])

    useEffect(() => {
        if (isLoaded) {
            setFormValues({...formValues, "days" : days.value });
            addRideFormRef.current.cleanErrorForField("days");
        }
    }, [days.value])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("arrivalTimeInput");
        }
    }, [arrivalTime])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("arrivalTimeReturnInput");
        }
    }, [arrivalTimeReturn])

    useEffect(() => {
        if (isLoaded) {
            setFormValues({...formValues, "carInput" : car});
            addRideFormRef.current.cleanErrorForField("carInput");
        }
    }, [car])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("seatsInput");
        }
    }, [seats])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("priceInput");
        }
    }, [price])

    useEffect(() => {
        if (isLoaded) {
            addRideFormRef.current.cleanErrorForField("commentInput");
        }
    }, [comment])

    useEffect(() => {
        if (Object.keys(formValues).length === 0) {
            if (isLoaded) {
                setFormValues(defaultFormValues);
            }
        }
    }, [isLoaded])

    const defaultFormValues = {
        "rideType" : rideType.value,
        "isRoundTrip" : isRoundTrip.value,
        "isFromAfpa" : isFromAfpa.value,
        "departure": departure.value,
        "arrival": arrival.value,
        "date" : departureDay.value,
        "dates" : recurringDates.value,
        "days" : days.value,
        "arrivalTimeInput": arrivalTime,
        "arrivalTimeReturnInput" : arrivalTimeReturn,
        "carInput" : car,
        "seatsInput" : seats,
        "priceInput" : price,
        "commentInput" : comment
    }

    useEffect(() => {
        const fetch = FetchService.get("/users/" + userId);
        fetch.then(
            (result) => {
                setDataUser(result);
                const dataResult = result.cars.map(
                    car => ({ label: car.model, value: car.model, key: car.id, seats: car.seats, avgFuelConsumption: car.avgFuelConsumption, idCarType: car.idCarType, idPerson: car.idPerson })
                );
                setCarsUser(dataResult);
                if (dataResult.length === 0) {
                    setPlaceholderCars("Vous ne possédez aucune voiture");
                }
                if (result.endContract) {
                }
                if (result.endTraining) {
                }
                setIsLoaded(true);
            },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        )
    }, []);


    const checkFormErrors = () => {
        let formErrors = null;
        if (rideType.value === "O") {
            if (isRoundTrip.value) {
                formErrors = addOneTimeRoundTrip.check(formValues);
            } else {
                formErrors = addOneTimeTrip.check(formValues);
            }
        }
        if (rideType.value === "R") {
            if (isRoundTrip.value) {
                formErrors = addRecurringRoundTrip.check(formValues);
            } else {
                formErrors = addRecurringTrip.check(formValues);
            }
        }
        console.log("car ", car, "errors ", formErrors);
        let isErrorFound = false;
        for (const [key, value] of Object.entries(formErrors)) {
            if (value.hasError) {
                isErrorFound = true;
                break;
            }
        }
        return isErrorFound;
    }

    const submitForm = () => {
        if (!checkFormErrors()) {
            let dataNewRide = {
                "rideType": rideType.value,
                "destination": {
                    "latitude": destination.value.lat,
                    "longitude": destination.value.lon,
                    "isFromAfpa": isFromAfpa.value,
                    "city": {
                        "name": (isFromAfpa.value ? arrival.value : departure.value)
                    }
                },
                "departureTime": arrivalTime.toISOString().substring(11, 19),
                "car": {
                    "id": car.key,
                    "person": {
                        "id": dataUser.id,
                        "personType": dataUser.personType
                    }
                },
                "price": price,
                "comment": comment,
                "isActive": true
            };
            if (rideType.value === "O") {
                dataNewRide = { ...dataNewRide, "departureDay": departureDay.value.toISOString().substring(0, 10) }
            } else if (rideType.value === "R") {
                dataNewRide = { ...dataNewRide, "beginning": recurringDates.value[0].toISOString().substring(0, 10), "ending": recurringDates.value[1].toISOString().substring(0, 10), "daysWeek": days.value }
            }
            const fetchPost = FetchService.post("/rides", JSON.stringify(dataNewRide));
            fetchPost.then((result) => {
                if (result.errorMessage) {
                    const toastError = toaster.push(<ToastMessage type="error" header="Erreur" content="Vous avez déjà créer un trajet similaire" />, { value: 'bottomStart' });
                    setTimeout(() => { toaster.remove(toastError) }, 3000);
                } else {
                    const toastSuccess = toaster.push(<ToastMessage type="success" header="Succès" content="Le trajet est enregistré" />, { value: 'bottomStart' });
                    setTimeout(() => { toaster.remove(toastSuccess) }, 3000);
                }
            },
                (error) => {
                    const toastFetchError = toaster.push(<ToastMessage type="error" header="Erreur" content="Une erreur est survenue" />, { value: 'bottomStart' });
                    setTimeout(() => { toaster.remove(toastFetchError) }, 3000);
                });

            if (isRoundTrip.value) {
                const dataRoundTrip = {
                    ...dataNewRide,
                    "destination": {
                        "latitude": destination.value.lat,
                        "longitude": destination.value.lon,
                        "isFromAfpa": !isFromAfpa.value,
                        "city": {
                            "name": (isFromAfpa.value ? arrival.value : departure.value)
                        }
                    },
                    "departureTime": arrivalTimeReturn.toISOString().substring(11, 19)
                };

                const fetchPost = FetchService.post("/rides", JSON.stringify(dataRoundTrip));
                fetchPost.then((result) => {
                });
            }
            navigate("/mes_trajets");
        }
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div className=' h-full flex justify-center items-center'><Loader size="sm" content="Chargement..." /></div>;
    } else {
        return (
            <div>
                <Form fluid model={addRideForm} checkTrigger='none' formValue={defaultFormValues} onChange={setFormValues} ref={addRideFormRef}>
                    <RideFormInputs />
                    <div className='flex justify-between'>
                        <Form.Group className="mb-[24px]" controlId='inputArrivalTime'>
                            <Form.ControlLabel>Heure de départ</Form.ControlLabel>
                            <Form.Control accepter={DatePicker} value={arrivalTime} placement="auto" name="arrivalTimeInput" format="HH:mm" onChange={setArrivalTime}>
                                <DatePicker  />
                            </Form.Control>
                        </Form.Group>
                        {isRoundTrip.value ?
                            <Form.Group controlId='inputArrivalTimeReturn'>
                                <Form.ControlLabel>Heure de départ retour</Form.ControlLabel>
                                <Form.Control accepter={DatePicker} placement="autoVerticalEnd" name="arrivalTimeReturnInput" format="HH:mm" onChange={setArrivalTimeReturn} value={arrivalTimeReturn} >
                                    <DatePicker />
                                </Form.Control>
                            </Form.Group>
                            : ""}
                    </div>
                    <div className="flex w-full">
                        <Form.Group className='w-full' controlId='inputChoiceCar'>
                            <Form.ControlLabel>Choix du véhicule :</Form.ControlLabel>
                            <Form.Control accepter={SelectPicker} name="carInput" block data={carsUser} placeholder={placeholderCars} value={carName} labelKey="label" min={1} max={2}
                                         onChange={setCarName} onSelect={(value, item) => { setCar(item); setSeats(item.seats) }} onClean={() => { setCarName(null); setCar({}); setSeats(0) }} >
                                <SelectPicker />
                            </Form.Control>
                        </Form.Group>
                        <Button className="h-[36px] self-center" color="green" appearance="subtle">
                            <FiPlusCircle className="text-xl " />
                        </Button>
                    </div>
                    <Form.Group controlId='inputSeats'>
                        <Form.ControlLabel>Nombre de places</Form.ControlLabel>
                        <Form.Control accepter={InputNumber} value={seats} name="seatsInput" onChange={setSeats} min={1} max={99} scrollable >
                            <InputNumber />
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='inputPrice'>
                        <Form.ControlLabel>Prix</Form.ControlLabel>
                        <InputGroup>
                            <Form.Control accepter={InputNumber} name="priceInput" onChange={setPrice} step={0.1} scrollable value={price}>
                                <InputNumber />
                            </Form.Control>
                            <InputGroup.Addon>
                                <Whisper placement="top" speaker={<Tooltip>Prix indicatif</Tooltip>} >
                                    <InfoIcon />
                                </Whisper>
                            </InputGroup.Addon>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId='inputComment'>
                        <Form.ControlLabel>Commentaire</Form.ControlLabel>
                        <Form.Control name="commentInput" rows={5} accepter={Textarea} onChange={setComment} />
                    </Form.Group>
                    <Form.Group className='flex justify-end my-4'>
                        <Button appearance="primary" type='submit' onClick={submitForm}>Enregistrer</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

/**
 * Permets de passer un textarea en props "accepter" de formcontrol
 */
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


export { AddRideForm }; 