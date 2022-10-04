import { React, useState, useEffect } from 'react';
import { Table, IconButton, Tooltip, Whisper } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { FiAlertCircle, FiXCircle, FiArrowRight } from "react-icons/fi";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import Moment from 'moment';
import { CheckBoxDays } from './CheckBoxDays';
import { BsCalendarCheck } from "react-icons/bs";

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
        return <p>{Moment(data.departureDay).format("DD/MM/YYYY")}</p>
    }
    if (data.beginning) {
        return (<p className="mr-2">Du {Moment(data.beginning).format("DD/MM/YYYY")} au {Moment(data.ending).format("DD/MM/YYYY")}</p>)
    }
}
function rowDestination(data) {
    if (data.destination.isFromAfpa) {
        return (<p className='flex '>AFPA <FiArrowRight className='mx-2' /> {data.destination.city.name}</p>);
    } else if (!data.destination.isFromAfpa) {
        return (<p className='flex '>{data.destination.city.name} <FiArrowRight className='mx-2' /> AFPA</p>);
    }
}

const TableRequestedRides = (props) => {
    const [idUser, setIdUser] = useState(props.id);
    const [userDriver, setUserDriver] = useState();
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const renderRowExpanded = rowData => {
        return (<div>
            <p className='flex'>Destination : </p>
            {rowDestination(rowData)}
            <p className='flex'>Date : </p>
            {rowDate(rowData)}
            {rowData.beginning ? <CheckBoxDays disabled={true} days={rowData.daysWeek} /> : ""}
            <p>Heure : </p>
            <p>{rowData.departureTime}</p>
            <p>Conducteur : </p>
            {rowData.requestedPassengers.map(passenger => {
                    if (passenger.isDriver) {
                        console.log(passenger);
                       return <p>{passenger.person.surname} {passenger.person.firstName.charAt(0)}.</p>
                    }
            })}
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
                    rowKey={rowKey}
                    expandedRowKeys={expandedRowKeys}
                    renderRowExpanded={renderRowExpanded}
                    rowExpandedHeight={250}
                    data={props.rides}
                    onRowClick={rowData => {
                        console.log(rowData);
                    }}>
                    <Column width={70} align="center">
                        <HeaderCell>#</HeaderCell>
                        <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                    </Column>
                    <Column flexGrow={2}>
                        <HeaderCell>Destinations</HeaderCell>
                        <Cell>
                            {rowData => (
                                rowDestination(rowData)
                            )}
                        </Cell>
                    </Column>
                    <Column flexGrow={2}>
                        <HeaderCell>Date</HeaderCell>
                        <Cell>
                        {rowData => (
                                rowDate(rowData)
                            )}
                        </Cell>
                    </Column>

                    <Column flexGrow={1}>
                        <HeaderCell>heure</HeaderCell>
                        <Cell dataKey="departureTime" />
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
                            {rowData => (
                                rowData.requestedPassengers.map((passenger) => {
                                    if (passenger.person.id == idUser) {
                                        switch (passenger.status) {
                                            case "PENDING":
                                                return <div className="text-yellow-500 text-xl"> <FiAlertCircle /> </div>
                                            case "ACCEPTED":
                                                return <div className="text-green-600 text-xl"> <AiOutlineCheckCircle /> </div>
                                            case "FINISHED":
                                                return   <Whisper
                                                        followCursor
                                                        trigger="hover"
                                                        speaker={<Tooltip arrow={true}>Le trajet est fini</Tooltip>}
                                                        >
                                                            <div className="text-gray-500 text-xl"> <AiFillCheckCircle /> </div>
                                                        </Whisper>
                                            default:
                                                return <div className="text-red-600 text-xl"> <FiXCircle /> </div>
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