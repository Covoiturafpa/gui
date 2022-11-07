import React, { useState } from 'react';

import { Table, IconButton, Tooltip, Whisper } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { FiAlertCircle, FiXCircle, FiArrowRight } from "react-icons/fi";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import Moment from 'moment';

import CheckBoxDays from './CheckBoxDays/CheckBoxDays';

const { Column, HeaderCell, Cell } = Table;
const rowKey = 'id';

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props} style={{ padding: 5 }}>
        <IconButton
            appearance="subtle"
            onClick={() => {
                onChange(rowData);
            }}
            icon={
                expandedRowKeys.some(key => key === rowData[rowKey]) ? (
                    <CollaspedOutlineIcon />
                ) : (
                    <ExpandOutlineIcon />
                )
            }
        />
    </Cell>
);


function rowDate(data) {
    if (data.departureDay) {
        return <span>{Moment(data.departureDay).format("DD/MM/YYYY")}</span>
    }
    if (data.beginning) {
        return (<span className="mr-2">Du {Moment(data.beginning).format("DD/MM/YYYY")} au {Moment(data.ending).format("DD/MM/YYYY")}</span>)
    }
}
function rowDestination(data) {
    if (data.destination.isFromAfpa) {
        return (<span className='flex '>AFPA <FiArrowRight className='mx-2' /> {data.destination.city.name}</span>);
    } else if (!data.destination.isFromAfpa) {
        return (<span className='flex '>{data.destination.city.name} <FiArrowRight className='mx-2' /> AFPA</span>);
    }
}

const TableRequestedRides = (props) => {
    const [idUser, setIdUser] = useState(props.id);
    const [userDriver, setUserDriver] = useState();
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const renderRowExpanded = rowData => {
        return (<div key={`expanded${rowData.id}`}>
            <p className='flex'>Destination : {rowDestination(rowData)}</p>
            <p className='flex'>Date : {rowDate(rowData)}</p>
            {rowData.beginning ? <CheckBoxDays disabled={true} days={rowData.daysWeek} /> : ""}
            <p>Heure : {rowData.departureTime.substring(0, 5)}</p>
            <p>Conducteur : 
            {rowData.requestedPassengers.map(passenger => {
                    if (passenger.isDriver) {
                       return <span key={`passenger${passenger.person.id}`}>{passenger.person.surname} {passenger.person.firstName.charAt(0)}.</span>
                    }
            })}</p>
            <p>Prix : {rowData.price} €</p>
        <p className='break-words'>Commentaire : {rowData.comment}</p>
        </div>);
    };

    const handleExpanded = (rowData, dataKey) => {
        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach(key => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });
        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }

        setExpandedRowKeys(nextExpandedRowKeys);
    }

    if (props.rides == 0) {
        return (<div>
            <div className="bg-gray-background rounded-t-md py-1">
                <h5 className="text-center">Mes trajets sollicités</h5>
                <p className='text-center'>Vous ne sollicitez aucun trajet</p>
            </div>
        </div>);
    } else {
        return (
            <div>
                <div className="bg-gray-background rounded-t-md py-1">
                    <h5 className="text-center">Mes trajets sollicités</h5>
                </div>
                <Table className='rounded-b-md bg-gray-background'
                    autoHeight={true}
                    expandedRowKeys={expandedRowKeys}
                    renderRowExpanded={renderRowExpanded}
                    rowExpandedHeight={200}
                    rowKey='id'
                    data={props.rides}>
                    <Column className="bg-gray-background" width={70} align="center">
                        <HeaderCell>#</HeaderCell>
                        <ExpandCell key={rowData => (`expendCell${rowData.id}`)} className="bg-gray-background" dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                    </Column>
                    <Column className="bg-gray-background" flexGrow={2} >
                        <HeaderCell dataKey="destination">Destination</HeaderCell>
                        <Cell key={rowData => (`destinationRequested${rowData.id}`)} className='bg-gray-background'>
                            {rowData => (
                                rowDestination(rowData)
                            )}
                        </Cell>
                    </Column>
                    <Column className="bg-gray-background" flexGrow={2}>
                        <HeaderCell>Date</HeaderCell>
                        <Cell dataKey="date" key={rowData => (`dateRequested${rowData.id}`)} className="bg-gray-background">
                        {rowData => (
                                rowDate(rowData)
                            )}
                        </Cell>
                    </Column>

                    <Column className="bg-gray-background" flexGrow={1}>
                        <HeaderCell>heure</HeaderCell>
                        <Cell dataKey="time" key={rowData => (`timeRequested${rowData.id}`)}>
                                {rowData => (
                                    rowData.departureTime.substring(0, 5)
                                )}
                            </Cell>
                    </Column>
                    <Column flexGrow={1}>
                        <HeaderCell>prix</HeaderCell>
                        <Cell dataKey="price" key={rowData => (`price${rowData.id}`)}>
                            {rowData => {
                                return (<p>{rowData.price} €</p>);
                            }}
                        </Cell>
                    </Column>
                    <Column flexGrow={0.5} >
                        <HeaderCell>État</HeaderCell>
                        <Cell dataKey="state" key={rowData => (`state${rowData.id}`)}>
                            {rowData => (
                                rowData.requestedPassengers.map((passenger) => {
                                    if (passenger.person.id == idUser) {
                                        switch (passenger.status) {
                                            case "PENDING":
                                                return <div key={passenger.person.id} className="text-yellow-500 text-xl"> <FiAlertCircle /> </div>
                                            case "ACCEPTED":
                                                return <div key={passenger.person.id} className="text-green-600 text-xl"> <AiOutlineCheckCircle /> </div>
                                            case "FINISHED":
                                                return   <Whisper key={passenger.person.id}
                                                        followCursor
                                                        trigger="hover"
                                                        speaker={<Tooltip arrow={true}>Le trajet est fini</Tooltip>}
                                                        >
                                                            <div  className="text-gray-500 text-xl"> <AiFillCheckCircle /> </div>
                                                        </Whisper>
                                            default:
                                                return <div key={passenger.person.id} className="text-red-600 text-xl"> <FiXCircle /> </div>
                                        }

                                    }
                                })
                            )}
                        </Cell>
                            </Column>
                </Table>

            </div>

        );
    }
}
export { TableRequestedRides };