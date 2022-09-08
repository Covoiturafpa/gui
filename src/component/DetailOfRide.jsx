import { React, useState, useEffect } from 'react';
import { FiArrowRight, FiPlusCircle   } from "react-icons/fi";
import { List, FlexboxGrid, DatePicker, Button, ButtonToolbar, SelectPicker, Input, InputNumber } from 'rsuite';
import Moment from 'moment';
import { CheckBoxDays } from './CheckBoxDays';
import { ListRow } from './ListRow';
import { FaEuroSign } from "react-icons/fa";
import { ListPassengers } from './ListPassengers';

const DetailOfRide = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataCar, setDataCar] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:3001/covoiturafpa/users/7/cars")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                const dataResult = result.map(
                    item => ({ label: item.model, value: item })
                  );
                setDataCar(dataResult);
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
                { props.IsOwner ? 
                                    <span className='flex flex-row'>
                                        AFPA <FiArrowRight className='mx-2' /> {props.destination.city.name}
                                    </span>
                                :   
                                    <span className='flex flex-row'>
                                        {props.destination.city.name} <FiArrowRight className='mx-2' /> AFPA
                                    </span> }
            </h6>
            <List>
                <ListRow label="id utilisateur">
                    <label>{props.destination.car.id_person}</label>
                </ListRow>
                <ListRow label="Type">
                    { props.id_one_time ? <label>Ponctuel</label> : <label>Régulier</label>}
                </ListRow>
                <ListRow label="Date et Heure">
                    { props.id_one_time ? <div>
                                            <label>{Moment(props.departure_day).format("DD/MM/YYYY")} à {props.departure_time}</label>
                                        </div>
                                       : <div>
                                            {props.isOwner ? <div>
                                                                <DatePicker defaultValue={new Date(props.beginning)}/>
                                                                <DatePicker defaultValue={new Date(props.ending)}/>
                                                                <DatePicker format="HH:mm:ss"/>
                                                            </div>
                                                            : <label>Du {Moment(props.beginning).format("DD/MM/YYYY")} au {Moment(props.ending).format("DD/MM/YYYY")} à {props.departure_time}</label>
                                            }
                                        </div>}
                </ListRow>
                { props.days ? 
                    <ListRow label="Jours">
                        <CheckBoxDays {...props.days}/>
                    </ListRow>
                : "" }
                { props.isOwner ? 
                    <ListRow label="Véhicule">
                        <SelectPicker data={dataCar} style={{ width: 230 }} />
                        <Button color="green" appearance="subtle">
                            <p className="hover:text-white transition duration-150 text-xl text-green-500 " >
                                <FiPlusCircle/>
                            </p>
                        </Button>
                    </ListRow>
                : "" }
                <ListRow label="Nombre de place">
                    { props.isOwner ? <div style={{ width: 160 }}>
                                            <InputNumber defaultValue={props.destination.car.seats}/>
                                        </div>
                                    : <label>{props.destination.car.seats}</label> }
                </ListRow>
                <ListRow label="Prix">
                    { props.isOwner ? <div className="flex items-center" style={{ width: 160 }}>
                                            <InputNumber defaultValue={props.price}/>
                                            <FaEuroSign/>
                                        </div>
                                    : <label>{props.price} €</label> }
                </ListRow>
                <ListRow label="Commentaire">
                    { props.isOwner ? <Input as="textarea" rows={3} placeholder={props.comment} />
                                    : <label>{props.comment}</label> }
                </ListRow>
                {props.isOwner ? 
                    <ListRow label="Passagers">
                        <ListPassengers passengers={props.destination.passenger}/>
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