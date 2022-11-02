import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FiArrowRight   } from "react-icons/fi";
import { List, Button, ButtonToolbar,Input, Checkbox, useToaster } from 'rsuite';
import Moment from 'moment';
import CheckBoxDays from './CheckBoxDays/CheckBoxDays';
import { ListRow } from './ListRow';
import { ListPassengers } from './ListPassengers';
import { ToastMessage } from './ToastMessage';
import FetchService from '../services/FetchService';


const DetailOfRide = (props) => {
    const [labelCheckbox, setLabelCheckbox] = useState();
    const [isChecked, setIsChecked] = useState(props.ride.isActive);
    const [inputComment, setInputComment] = useState(props.ride.comment);
    const toaster = useToaster();

    const deleteRide = (idRide) => {
        const fetchDelete = FetchService.delete("/rides/" + idRide);
        fetchDelete.then((result) => {
            const toastSuccess = toaster.push(<ToastMessage type="success" header="Succès" content="Le trajet a bien était supprimé"/>, { value : 'bottomStart' });
            setTimeout(() => {toaster.remove(toastSuccess)}, 3000);
            props.setEditable(false);
            props.setReload(true);
        },
        (error) => {
            const toastError = toaster.push(<ToastMessage type="error" header="Erreur" content="Une erreur c'est produite lors de la suppression"/>, { value : 'bottomStart' });
            setTimeout(() => {toaster.remove(toastError)}, 3000);
        });
    }

    const updateRide = (idRide) => {
        let newRide = {...props.ride, comment : inputComment, isActive : isChecked};
        const fetchPut = FetchService.put("/update/rides/" + idRide, JSON.stringify(newRide));
        fetchPut.then((result) => {
            console.log(result);
            if (result.type === "success") {
                const toastSuccessPut = toaster.push(<ToastMessage type="success" header="Succès" content={result.message}/>, { value : 'bottomStart' });
                setTimeout(() => {toaster.remove(toastSuccessPut)}, 3000);
                props.setEditable(false);
                props.setReload(true);
            }else {
                const toastErrorPut = toaster.push(<ToastMessage type="error" header="Erreur" content={result.message}/>, { value : 'bottomStart' });
                setTimeout(() => {toaster.remove(toastErrorPut)}, 3000);
            }
        });
    }

    useEffect(() => {
        if (isChecked) {
            setLabelCheckbox("trajet disponible");
        }else if (!isChecked) {
            setLabelCheckbox("trajet indisponible");
        }
    },[isChecked]);


        return(<div className='bg-white p-5'>
            <h5>Détail du trajet</h5>
            <h6>
                { props.ride.destination.isFromAfpa ? 
                                    <span className='flex flex-row'>
                                        AFPA <FiArrowRight className='mx-2' /> {props.ride.destination.city.name}
                                    </span>
                                :   
                                    <span className='flex flex-row'>
                                        {props.ride.destination.city.name} <FiArrowRight className='mx-2' /> AFPA
                                    </span> }
            </h6>
            <List>
                <ListRow label="Disponibilité">
                    <Checkbox checked={isChecked} key="disponibility" onClick={()=> { setIsChecked(!isChecked)}}><span>{labelCheckbox}</span></Checkbox>
                </ListRow>
                
                <ListRow label="Conducteur">
                    {props.ride.requestedPassengers.map(passenger => {
                        if(passenger.isDriver) {
                            return(<label key={`driver${passenger.person.id}`}>{ passenger.person.surname } {passenger.person.firstName.charAt(0)}.</label>);
                        }
                    })}
                    
                </ListRow>
                <ListRow label="Type">
                    { props.ride.departureDay ? <label key="type">Ponctuel</label> : <label key="type">Régulier</label>}
                </ListRow>
                <ListRow label="Date et Heure">
                    { props.ride.departureDay ? <div>
                                            <label key="dateTime">{Moment(props.ride.departureDay).format("DD/MM/YYYY")} à {props.ride.departureTime}</label>
                                        </div>
                                       : <div>
                                            <label key="dateTime">Du {Moment(props.ride.beginning).format("DD/MM/YYYY")} au {Moment(props.ride.ending).format("DD/MM/YYYY")} à {props.ride.departureTime}</label>
                                        </div>}
                </ListRow>
                { props.ride.daysWeek ? 
                    <ListRow label="Jours">
                        <div>
                            <CheckBoxDays disabled={true} days={props.ride.daysWeek}/>
                        </div>
                    </ListRow>
                : "" }
                {props.isOwner ? 
                    <ListRow label="Véhicule">
                        <label key="car">{props.ride.car.model}</label> 
                    </ListRow>
                : "" }
                <ListRow label="Nombre de place">
                    <label key="seats">{props.ride.freeSeats}</label>
                </ListRow>
                <ListRow label="Prix">
                    <label key="price">{props.ride.price} €</label> 
                </ListRow>
                <ListRow label="Commentaire">
                    { props.isOwner ? <Input as="textarea" rows={3} value={inputComment} onChange={setInputComment}/>
                                    : <label key="commentary">{props.ride.comment}</label> }
                </ListRow>
                {props.isOwner ? 
                    <ListRow label="Passagers">
                        {(props.ride.requestedPassengers.length > 1) ? 
                            <div>
                                <ListPassengers setEditable={props.setEditable} ride={props.ride} passengers={props.ride.requestedPassengers}/>
                            </div>
                        : 
                            <div >
                                <label>Vous n'avez aucun passagers</label>
                            </div>}
                    </ListRow>
                                : "" }
            </List>
            <ButtonToolbar className='flex justify-end'>
                <Button color="red" appearance="primary" onClick={() => {deleteRide(props.ride.id)}}>Supprimer</Button>
                <Button appearance='ghost' color="blue" onClick={() => {props.setEditable(false)}}>Retour</Button>
                <Button appearance="primary" onClick={() => {updateRide(props.ride.id)}}>Enregistrer</Button>

            </ButtonToolbar>
        </div>);
    
}

export{ DetailOfRide };