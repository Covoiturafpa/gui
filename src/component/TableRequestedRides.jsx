import { React, useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { FiAlertCircle, FiXCircle, FiArrowRight} from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Moment from 'moment';
import { CheckBoxDays } from './CheckBoxDays';
import { BsCalendarCheck } from "react-icons/bs";


const TableRequestedRides = (props) => {
    const [idUser, setIdUser] = useState(props.id);
    const [userDriver, setUserDriver] = useState();
    const [statusType, setStatusType]= useState("");
    const { Column, HeaderCell, Cell } = Table;

    if (props.rides == 0) {
        return (<div>
                    <div className="bg-white rounded-t-md py-1">
                        <h5 className="text-center">Mes trajets sollicités</h5>
                        <p className='text-center'>Vous sollicitez aucun trajet</p>
                    </div>
                </div>);
    } else {
        return (
            <div>
                <div className="bg-white rounded-t-md py-1">
                    <h5 className="text-center">Mes trajets sollicités</h5>
                </div>
                <Table className='rounded-b-md'
                    autoHeight={true}
                    data={props.rides}
                    onRowClick={rowData => {
                        console.log(rowData);
                    }}>
                        
                    <Column align="center" flexGrow={2}>
                        <HeaderCell>Destinations</HeaderCell>
                        <Cell>
                            {rowData => {
                                if (rowData.destination.isFromAfpa) {
                                    return (<p className='flex justify-center align-center'>AFPA <FiArrowRight className='mx-2' /> {rowData.destination.city.name}</p>)
                                } else if (!rowData.destination.isFromAfpa) {
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
                        <Cell>
                            {rowData => {
                                    setUserDriver();
                                rowData.possiblePassengers.map(passenger => {
                                    if(passenger.isDriver) {
                                        setUserDriver(passenger.user);
                                    console.log(passenger.user);

                                    }
                                })
                                if(userDriver) {
                                    return(<div>
                                        <p>{ userDriver.surname } {userDriver.firstName.charAt(0)}.</p>
                                    </div>);
                                } 

                            }}
                        </Cell>
                    </Column>
                    <Column flexGrow={1}>
                        <HeaderCell>prix</HeaderCell>
                        <Cell>
                            {rowData => {
                                return (<p>{rowData.price} €</p>);
                            }}
                        </Cell>
                    </Column>
                    <Column flexGrow={0.5} >
                        <HeaderCell>État</HeaderCell>
                        <Cell>
                        {rowData => {
                            console.log(rowData.possiblePassengers);
                            rowData.possiblePassengers.map(passenger => {
                                if(passenger.user.id === idUser) {
                                    setStatusType(passenger.statusType)
                                }
                            });
                            if (statusType === "PENDING") {
                                return (<div className="text-yellow-500 text-xl">
                                            < FiAlertCircle/>
                                        </div>)
                            }else if (statusType === "ACCEPTED") {
                                return (<div className="text-green-600 text-xl">
                                            <AiOutlineCheckCircle/>
                                        </div>)
                            }else if (statusType === "FINISHED") {
                                return (<div className="text-blue-900 text-xl">
                                            <BsCalendarCheck/>
                                        </div>)
                            }else if (!statusType) {
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