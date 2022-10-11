import React from 'react';
import { useState, createContext, useContext, useEffect } from 'react';
import { Input, Form, Button, DatePicker, SelectPicker, InputNumber, Stack } from 'rsuite';
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
    const [userId, setUserId] = useState(authService.getCurrentUserId());
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [placeholderCars, setPlaceholderCars] = useState("");
    const { arrival, departure, destination, isFromAfpa, rideType, isRoundTrip, departureDay, recurringDates } = useContext(RideFormContext);

    useEffect(() => {
        const fetch = FetchService.get("/users/" + userId);
        fetch.then(
            (result) => {
                console.log(result);
                const dataResult = result.cars.map(
                    car => ({ label: car.model, value: car.model, key: car.id })
                );
                setCarsUser(dataResult);
                if (dataResult.length == 0) {
                    setPlaceholderCars("Vous posséder aucune voiture");
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
                        <DatePicker format="HH:mm" />
                    </Form.Group>
                    {formStates.isRoundTrip.value && formStates.isRoundTrip.value[0] == 'checked' ?
                        <Form.Group controlId='inputArrivalTimeReturn'>
                            <Form.ControlLabel>Heure de départ retour</Form.ControlLabel>
                            <DatePicker format="HH:mm" />
                        </Form.Group>
                        : ""}
                </div>
                <div className="flex w-full">
                    <Form.Group className='w-full' controlId='inputChoiceCar'>
                        <Form.ControlLabel>Choix du véhicule :</Form.ControlLabel>
                        <SelectPicker data={carsUser} block placeholder={placeholderCars} />
                    </Form.Group>
                    <Button className="h-[36px] self-center" color="green" appearance="subtle">
                        <FiPlusCircle className="text-xl !text-green-600 hover:text-white" />
                    </Button>
                </div>
                <Form.Group controlId='inputSeats'>
                    <Form.ControlLabel>Nombre de places</Form.ControlLabel>
                    <InputNumber />
                </Form.Group>
                <Form.Group controlId='inputPrice'>
                    <Form.ControlLabel>Prix</Form.ControlLabel>
                    <InputNumber />
                </Form.Group>
                <Form.Group controlId='inputComment'>
                    <Form.ControlLabel>Commentaire</Form.ControlLabel>
                    <Form.Control rows={5} name="textarea" accepter={Textarea} />
                </Form.Group>
                <Form.Group className='flex justify-end my-4'>
                    <Button appearance="primary" onClick={submitForm}>Rechercher</Button>
                </Form.Group>
            </Form>
        );
    }
}

export { AddRideForm }; 