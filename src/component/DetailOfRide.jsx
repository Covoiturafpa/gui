import { React, useState, useEffect } from 'react';
import { FiArrowRight   } from "react-icons/fi";
import { List, DatePicker, Button, ButtonToolbar,Input, Checkbox } from 'rsuite';
import Moment from 'moment';
import { CheckBoxDays } from './CheckBoxDays';
import { ListRow } from './ListRow';
import { ListPassengers } from './ListPassengers';
import  FetchService  from "../services/FetchService";
import  authService  from "../services/AuthService";

const DetailOfRide = (props) => {
    const [dataCar, setDataCar] = useState();
    const [carSelect, setCarSelect] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = FetchService.get("/users/"+ authService.getCurrentUserId());
        fetch.then(res => res.json())
        .then(
            (result) => {
                console.log(props)
                console.log(result);
                const dataResult = result.cars.map(
                    car => ({ label: car.model, value: car.model, key: car.id })
                  );
                setDataCar(dataResult); 
                console.log(dataResult);
                dataResult.map(item => {
                    if(item.value == props.car.model) {
                        setCarSelect(item.label);
                        setIsLoaded(true);
                    }
                });

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []);
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    }else {
        return(<div className='bg-white p-5'>
            <h5>Détail du trajet</h5>
            <h6>
                { props.destination.isFromAfpa ? 
                                    <span className='flex flex-row'>
                                        AFPA <FiArrowRight className='mx-2' /> {props.destination.city.name}
                                    </span>
                                :   
                                    <span className='flex flex-row'>
                                        {props.destination.city.name} <FiArrowRight className='mx-2' /> AFPA
                                    </span> }
            </h6>
            <List>
                <ListRow label="Disponibilité">
                    {props.isActive ?
                        <Checkbox checked>Trajet disponible</Checkbox>
                    :
                        <Checkbox>Trajet indisponible</Checkbox> }
                </ListRow>
                <ListRow label="Conducteur">
                    {props.requestedPassengers.map(passenger => {
                        if(passenger.isDriver) {
                            return(<label>{ passenger.person.surname } {passenger.person.firstName.charAt(0)}.</label>);
                        }
                    })}
                    
                </ListRow>
                <ListRow label="Type">
                    { props.departureDay ? <label>Ponctuel</label> : <label>Régulier</label>}
                </ListRow>
                <ListRow label="Date et Heure">
                    { props.departureDay ? <div>
                                            <label>{Moment(props.departureDay).format("DD/MM/YYYY")} à {props.departureTime}</label>
                                        </div>
                                       : <div>
                                            { props.isOwner ? <div>
                                                                <DatePicker defaultValue={new Date(props.beginning)}/>
                                                                <DatePicker defaultValue={new Date(props.ending)}/>
                                                                <DatePicker format="HH:mm:ss"/>
                                                            </div>
                                                            : <label>Du {Moment(props.beginning).format("DD/MM/YYYY")} au {Moment(props.ending).format("DD/MM/YYYY")} à {props.departureTime}</label>
                                            }
                                        </div>}
                </ListRow>
                { props.daysWeek ? 
                    <ListRow label="Jours">
                        <div>
                            <CheckBoxDays disabled={props.isOwner ? false : true} days={props.daysWeek}/>
                        </div>
                    </ListRow>
                : "" }
                {props.isOwner ? 
                    <ListRow label="Véhicule">
                        <label>{props.car.model}</label> 
                    </ListRow>
                : "" }
                <ListRow label="Nombre de place">
                    <label>{props.freeSeats}</label>
                </ListRow>
                <ListRow label="Prix">
                    <label>{props.price} €</label> 
                </ListRow>
                <ListRow label="Commentaire">
                    { props.isOwner ? <Input as="textarea" rows={3} placeholder={props.comment} />
                                    : <label>{props.comment}</label> }
                </ListRow>
                {props.isOwner ? 
                    <ListRow label="Passagers">
                        <ListPassengers passengers={props.requestedPassengers}/>
                    </ListRow>
                                : "" }
            </List>
            <ButtonToolbar className='flex justify-end'>
                <Button color="red" appearance="primary">
                    Supprimer</Button>
                <Button appearance='ghost' color="blue" >Retour</Button>
                <Button appearance="primary">Enregistrer</Button>

            </ButtonToolbar>
        </div>);
    }
}

export{ DetailOfRide };