import { React, useState } from 'react';

import { Table, IconButton } from 'rsuite';

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';

import { FiEdit2, FiArrowRight } from "react-icons/fi";

import CheckBoxDays from './CheckBoxDays/CheckBoxDays';
import { DetailOfRide } from './DetailOfRide';

import Moment from 'moment';

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
        return (Moment(data.departureDay).format("DD/MM/YYYY"))
    }
    if (data.beginning) {
        return (<p className="mr-2">Du {Moment(data.beginning).format("DD/MM/YYYY")} au {Moment(data.ending).format("DD/MM/YYYY")} les </p>)
    }
}
function rowDestination(data) {
    if (data.destination.isFromAfpa) {
        return (<p className='flex '>AFPA <FiArrowRight className='mx-2' /> {data.destination.city.name}</p>);
    } else if (!data.destination.isFromAfpa) {
        return (<p className='flex '>{data.destination.city.name} <FiArrowRight className='mx-2' /> AFPA</p>);
    }
}

const TableProposedRides = (props) => {
    const [isEditable, setIsEditable] = useState(false);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [detailRide, setDetailRide] = useState(null);

    const renderRowExpanded = rowData => {
        console.log(rowData);
        return (<div>
            <p className='flex'>Destination : </p>
            <p>{rowDestination(rowData)}</p>
            <p className='flex'>Date : </p>
            <p>{rowDate(rowData)}</p>
            {rowData.beginning ? <CheckBoxDays disabled={true} days={rowData.daysWeek} /> : ""}
            <p>Heure : </p>
            <p>{rowData.departureTime}</p>
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

    function showDetail(ride) {
        setDetailRide(ride);
        setIsEditable(true);
    }


    if (isEditable) {
        return (<DetailOfRide isOwner={true} userId={props.id} ride={detailRide} setEditable={setIsEditable}/>);
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
                        rowKey={rowKey}
                        expandedRowKeys={expandedRowKeys}
                        renderRowExpanded={renderRowExpanded}
                        rowExpandedHeight={200}
                    >
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


                        <Column flexGrow={0.5} >
                            <HeaderCell>Modif.</HeaderCell>
                            <Cell>
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