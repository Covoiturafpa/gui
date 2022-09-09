import { React, useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { FiAlertCircle, FiXCircle, FiArrowRight} from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Moment from 'moment';
import { CheckBoxDays } from './CheckBoxDays';
import { BsCalendarCheck } from "react-icons/bs";


const TableRequestedRides = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const { Column, HeaderCell, Cell } = Table;

     
    useEffect(() => {
        fetch("http://127.0.0.1:8000/rides")
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setData(result);
            },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [])
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <div>
                <div className="bg-white rounded-t-md py-1">
                    <h5 className="text-center">Mes trajets sollicités</h5>
                </div>
                <Table className='rounded-b-md'
                    autoHeight={true}
                    data={data}
                    onRowClick={rowData => {
                        console.log(rowData);
                    }}>
                    <Column align="center" flexGrow={2}>
                        <HeaderCell>Destinations</HeaderCell>
                        <Cell>
                            {rowData => {
                                if (rowData.destination.fromAfpa) {
                                    return (<p className='flex justify-center align-center'>AFPA <FiArrowRight className='mx-2' /> {rowData.destination.city.name}</p>)
                                } else if (!rowData.destination.fromAfpa) {
                                    return (<p className='flex justify-center'>{rowData.destination.city.name} <FiArrowRight className='mx-2' /> AFPA</p>)
                                }
                            }}
                        </Cell>
                    </Column>
                    <Column flexGrow={2}>
                        <HeaderCell>Date</HeaderCell>
                        <Cell>
                            {rowData => {
                                if (rowData.departureDay) {
                                    return (Moment(rowData.departureDay).format("DD/MM/YYYY"))
                                }
                                if (rowData.beginning) {
                                    return ( <div>
                                        <p>{Moment(rowData.beginning).format("DD/MM/YYYY")} au {Moment(rowData.ending).format("DD/MM/YYYY")}</p>
                                    </div>)
                                }
                            }}
                        </Cell>
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>heure</HeaderCell>
                        <Cell dataKey="departureTime" />
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>Conducteur</HeaderCell>
                        <Cell dataKey="destination.car.id_person" />
                    </Column>
                    <Column flexGrow={1}>
                        <HeaderCell>prix</HeaderCell>
                        <Cell>
                            {rowData => (
                                <p>{rowData.price} €</p>
                            )}
                        </Cell>
                    </Column>
                    <Column flexGrow={0.5} >
                        <HeaderCell>État</HeaderCell>
                        <Cell>
                        {rowData => {
                                if (rowData.destination.possiblePassengers.status_type === "pending") {
                                    return (<div className="text-yellow-500 text-xl">
                                                < FiAlertCircle/>
                                            </div>)
                                }else if (rowData.destination.possiblePassengers.status_type === "accepted") {
                                    return (<div className="text-green-600 text-xl">
                                                <AiOutlineCheckCircle/>
                                            </div>)
                                }else if (rowData.destination.possiblePassengers.status_type === "finished") {
                                    return (<div className="text-blue-900 text-xl">
                                                <BsCalendarCheck/>
                                            </div>)
                                }else if (!rowData.destination.possiblePassengers.status_type) {
                                    return (<div className="text-red-600 text-xl">
                                                <FiXCircle/>
                                            </div>)
                                }

                            }}
                        </Cell>
                    </Column>
                </Table>

            </div>

        );
    }
}
export { TableRequestedRides };