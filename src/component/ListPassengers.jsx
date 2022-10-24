import { React, useState, useEffect } from 'react';
import { List, FlexboxGrid, Divider, Avatar, Drawer, Button, ButtonToolbar, useToaster, Loader } from 'rsuite';
import { AiOutlineMessage, AiOutlineCheckCircle } from "react-icons/ai";
import { FiAlertCircle, FiXCircle, FiArrowRight} from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";
import { ToastMessage } from './ToastMessage';
import FetchService from '../services/FetchService';
import  authService  from "../services/AuthService";


const ListPassengers = (props) => {
    const [backdrop, setBackdrop] = useState('static');
    const [open, setOpen] = useState(false);
    const [selectedPassenger, setSelectedPassenger] = useState({});
    const [isAccepted, setisAccepted] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [contentLoader, setContentLoader] = useState(null);
    const [actionStatusMessage, setActionStatusMessage] = useState("Voulez-vous l'accepter en tant que passager ?");
    const toaster = useToaster();

    useEffect(() => {
        if(!isLoaded) {
            setContentLoader(<Loader size="sm" content="Chargement..." />);
        }else {
            setContentLoader(null);
        }
    }, [isLoaded]);

    useEffect(() => {
        if(isAccepted !== null && selectedPassenger !== null) {
            setIsLoaded(false);
            const fetchPut = FetchService.put(`/users/${authService.getCurrentUserId()}/rides/${props.ride.id}?idPassenger=${selectedPassenger.id}&isAccepted=${isAccepted}`, null);
            fetchPut.then((result) => {
                console.log(result);
                if (result.type === "success") {
                    const toastSuccessPut = toaster.push(<ToastMessage type="success" header="Succès" content={result.message}/>, { value : 'bottomStart' });
                    setTimeout(() => {toaster.remove(toastSuccessPut)}, 3000);
                    setIsLoaded(true);
                    setOpen(false);
                    props.setEditable(false);

                }else {
                    const toastErrorPut = toaster.push(<ToastMessage type="error" header="Erreur" content={result.message}/>, { value : 'bottomStart' });
                    setTimeout(() => {toaster.remove(toastErrorPut)}, 3000);
                }
            });
        }
    }, [isAccepted]);
    const handleDrawer = (passenger) => {
        setSelectedPassenger(passenger);
        setOpen(true);
    }

    const handleStatus = (status) => {
        if(status === "accepted") {
            setActionStatusMessage("Vous acceptez ce passager");
            setisAccepted(true);
        }else if(status === "denied") {
            setActionStatusMessage("Vous refusez ce passager");
            setisAccepted(false);
        }
    }
    const statusIcon = (status) => {
        if (status === "PENDING") {
            return(<div className="text-yellow-500 text-xl">
                        < FiAlertCircle/>
                    </div>)
        }else if (status === "ACCEPTED") {
            return(<div className="text-green-600 text-xl">
                        <AiOutlineCheckCircle/>
                    </div>)
        }else if (status === "FINISHED") {
            return(<div className="text-blue-900 text-xl">
                        <BsCalendarCheck/>
                    </div>)
        }else if (!status) {
            return(<div className="text-red-600 text-xl">
                        <FiXCircle/>
                    </div>)
        }
    }
    return(
        <div>
            <List>
                {props.passengers.map((item) => {
                    if (!item.isDriver) {
                        return(
                            <List.Item key={item.person.id} >
                                <FlexboxGrid>
                                    <FlexboxGrid.Item colspan={2}>
                                        <Avatar size="xs" circle src={item.person.photo_path} alt={item.person.surname} />
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={18}>
                                        <label>{item.person.surname} {item.person.firstName}</label>
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={1}>
                                        <a className="text-xl" onClick={() => handleDrawer(item.person)}>
                                            <AiOutlineMessage/>
                                        </a>
                                    </FlexboxGrid.Item>
                                    <Divider vertical />
                                    <FlexboxGrid.Item colspan={1}>
                                        {statusIcon(item.status)}
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </List.Item>
                        );
                    }
                })}
            </List>
            <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>Validation du passager</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <div className='flex flex-col w-full h-full items-center justify-around py-40'>
                        {contentLoader}
                        <p className='text-base'>{actionStatusMessage}</p>
                        <ButtonToolbar>
                            <Button onClick={() => handleStatus("denied" )} appearance="primary" color="red">Refuser</Button>
                            <Button onClick={() => handleStatus("accepted") } appearance="primary" color="green">Accepter</Button>
                        </ButtonToolbar>
                    </div>
                    
                </Drawer.Body>
            </Drawer>
        </div>
        
    );
}

export { ListPassengers };