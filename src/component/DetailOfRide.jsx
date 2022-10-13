import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight   } from "react-icons/fi";
import { List, DatePicker, Button, ButtonToolbar,Input, Checkbox } from 'rsuite';
import Moment from 'moment';
import CheckBoxDays from './CheckBoxDays/CheckBoxDays';
import { ListRow } from './ListRow';
import { ListPassengers } from './ListPassengers';

const DetailOfRide = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [labelCheckbox, setLabelCheckbox] = useState();
    const [isChecked, setIsChecked] = useState(props.isActive);

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
                    <Checkbox checked={isChecked} onClick={()=> { setIsChecked(!isChecked)}}><span>{labelCheckbox}</span></Checkbox>
                
                </ListRow>
                <ListRow label="Conducteur">
                    {props.ride.requestedPassengers.map(passenger => {
                        if(passenger.isDriver) {
                            return(<label>{ passenger.person.surname } {passenger.person.firstName.charAt(0)}.</label>);
                        }
                    })}
                    
                </ListRow>
                <ListRow label="Type">
                    { props.ride.departureDay ? <label>Ponctuel</label> : <label>Régulier</label>}
                </ListRow>
                <ListRow label="Date et Heure">
                    { props.ride.departureDay ? <div>
                                            <label>{Moment(props.ride.departureDay).format("DD/MM/YYYY")} à {props.ride.departureTime}</label>
                                        </div>
                                       : <div>
                                            { props.ride.isOwner ? <div>
                                                                <DatePicker defaultValue={new Date(props.beginning)}/>
                                                                <DatePicker defaultValue={new Date(props.ending)}/>
                                                                <DatePicker format="HH:mm:ss"/>
                                                            </div>
                                                            : <label>Du {Moment(props.ride.beginning).format("DD/MM/YYYY")} au {Moment(props.ride.ending).format("DD/MM/YYYY")} à {props.Ride.departureTime}</label>
                                            }
                                        </div>}
                </ListRow>
                { props.ride.daysWeek ? 
                    <ListRow label="Jours">
                        <div>
                            <CheckBoxDays disabled={props.ride.isOwner ? false : true} days={props.ride.daysWeek}/>
                        </div>
                    </ListRow>
                : "" }
                {props.ride.isOwner ? 
                    <ListRow label="Véhicule">
                        <label>{props.ride.car.model}</label> 
                    </ListRow>
                : "" }
                <ListRow label="Nombre de place">
                    <label>{props.ride.freeSeats}</label>
                </ListRow>
                <ListRow label="Prix">
                    <label>{props.ride.price} €</label> 
                </ListRow>
                <ListRow label="Commentaire">
                    { props.ride.isOwner ? <Input as="textarea" rows={3} placeholder={props.ride.comment} />
                                    : <label>{props.ride.comment}</label> }
                </ListRow>
                {props.ride.isOwner ? 
                    <ListRow label="Passagers">
                        <ListPassengers passengers={props.ride.requestedPassengers}/>
                    </ListRow>
                                : "" }
            </List>
            <ButtonToolbar className='flex justify-end'>
                <Button color="red" appearance="primary">
                    Supprimer</Button>
                <Button appearance='ghost' color="blue" onClick={() => {props.setEditable(false)}}>Retour</Button>
                <Button appearance="primary">Enregistrer</Button>

            </ButtonToolbar>
        </div>);
    
}

export{ DetailOfRide };