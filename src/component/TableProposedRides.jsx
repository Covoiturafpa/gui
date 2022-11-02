import React, { useState } from 'react';

import { Table, IconButton } from 'rsuite';

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';

import { FiEdit2, FiArrowRight } from "react-icons/fi";

import CheckBoxDays from './CheckBoxDays/CheckBoxDays';
import { DetailOfRide } from './DetailOfRide';

import Moment from 'moment';

const { Column, HeaderCell, Cell } = Table;
const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props} style={{ padding: 5 }}>
        <IconButton
            appearance="subtle"
            onClick={() => {
                onChange(rowData);
            }}
            icon={
                expandedRowKeys.some(key => key === rowData['id']) ? (
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
        return (Moment(data.departureDay).format("DD/MM/YYYY"))
    }
    if (data.beginning) {
        return (<span>Du {Moment(data.beginning).format("DD/MM/YYYY")} au {Moment(data.ending).format("DD/MM/YYYY")}</span>)
    }
}
function rowDestination(data) {
    if (data.destination.isFromAfpa) {
        return (<span className='flex '> AFPA <FiArrowRight className='mx-2' /> {data.destination.city.name}</span>);
    }
    if (!data.destination.isFromAfpa) {
        return (<span className='flex '> {data.destination.city.name} <FiArrowRight className='mx-2' /> AFPA</span>);
    }
}

const TableProposedRides = (props) => {
    const [isEditable, setIsEditable] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [detailRide, setDetailRide] = useState(null);

    const renderRowExpanded = rowData => {
        return (<div>
            <p className='flex break-words'>Destination :  {rowDestination(rowData)}</p>
            <p className='flex'>Date : {rowDate(rowData)}</p>
            {rowData.beginning ? <CheckBoxDays disabled={true} days={rowData.daysWeek} /> : ""}
            <p>Heure : {rowData.departureTime.substring(0, 5)}</p>
            <p>Prix : {rowData.price} €</p>
            <p className="break-words">Commentaire : {rowData.comment}</p>
        </div>);
    };

    const handleExpanded = (rowData, dataKey) => {
        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach(key => {
            if (key === rowData['id']) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });
        if (!open) {
            nextExpandedRowKeys.push(rowData['id']);
        }
        setExpandedRowKeys(nextExpandedRowKeys);
    }

    function showDetail(ride) {
        setDetailRide(ride);
        setIsEditable(true);
    }

    if (isEditable) {
        return (<DetailOfRide isOwner={true} userId={props.id} ride={detailRide} setReload={props.setReload} setEditable={setIsEditable}/>);
    }else {
        if (props.rides === 0) {
            return (
                <div>
                    <div className="bg-gray-background rounded-t-md py-1">
                        <h5 className="text-center">Mes trajets proposés</h5>
                        <p className='text-center'>Vous proposez aucun trajet</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="bg-gray-background rounded-t-md py-1">
                        <h5 className="text-center">Mes trajets proposés</h5>
                    </div>
                    <Table className='rounded-b-md'
                        autoHeight={true}
                        data={props.rides}
                        rowKey='id'
                        expandedRowKeys={expandedRowKeys}
                        renderRowExpanded={renderRowExpanded}
                        rowExpandedHeight={160}
                    >
                        <Column width={70} align="center">
                            <HeaderCell>#</HeaderCell>
                            <ExpandCell key="proutprout" dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                        </Column>
                        <Column flexGrow={2}>
                            <HeaderCell>Destinations</HeaderCell>
                            <Cell dataKey="destination" key={rowData => (`destination${rowData.id}`)}>
                                {rowData => (
                                    rowDestination(rowData)
                                )}
                            </Cell>
                        </Column>
                        <Column flexGrow={2}>
                            <HeaderCell>Date</HeaderCell>
                            <Cell dataKey="date" key={rowData => (`date${rowData.id}`)}>
                                {rowData => (
                                    rowDate(rowData)
                                )}
                            </Cell>
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>heure</HeaderCell>
                            <Cell dataKey="time" key={rowData => (`time${rowData.id}`)} >
                                {rowData => (
                                    rowData.departureTime.substring(0, 5)
                                )}
                            </Cell>
                        </Column>

                        <Column flexGrow={0.5} >
                            <HeaderCell>Modif.</HeaderCell>
                            <Cell dataKey="update" key={rowData => (`update${rowData.id}`)}>
                                {rowData => (
                                    <span>
                                        <a className="text-xl" onClick={() => showDetail(rowData)}> <FiEdit2 /> </a>
                                    </span>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                </div>
            );
        }
    }

}
export { TableProposedRides };