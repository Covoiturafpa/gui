import { React, useState, useContext, useEffect } from 'react';
import { Table, IconButton, Button } from 'rsuite';
import Moment from 'moment';
import CheckBoxDays from '../CheckBoxDays/CheckBoxDays';
import { RideFormContext } from './RideFormContextProvider';
import FetchService from "../../services/FetchService";
import AuthService from "../../services/AuthService";

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import { FiArrowRight } from "react-icons/fi";

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
        return (`Du ${Moment(data.beginning).format("DD/MM/YYYY")} au ${Moment(data.ending).format("DD/MM/YYYY")} les`)
    }
}

function rowDestination(data) {
    if (data.destination.isFromAfpa) {
        return (<>AFPA <FiArrowRight className='mx-2' /> {data.destination.city.name}</>);
    } else if (!data.destination.isFromAfpa) {
        return (<>{data.destination.city.name} <FiArrowRight className='mx-2' /> AFPA</>);
    }
}

function rowPrice(data) {
    return <p>{data.price}&euro;</p>
}


const booking = (ride) => {
    FetchService.put(`/rides/${ride.id}?idPassenger=${AuthService.getCurrentUserId()}`);
}

const RidesResultTable = (props) => {

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const { rides } = useContext(RideFormContext);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (rides.value.length > 0) {
            const data = props.returns === false ? rides.value[0] : rides.value[1];
            setTableData(data);
        }
    }, [rides])

    const renderRowExpanded = rowData => {
        return (<div>
            <p className='flex'>Destination : </p>
            <p className='flex'>{rowDestination(rowData)}</p>
            <p className='flex'>Date : </p>
            <p>{rowDate(rowData)}</p>
            {rowData.beginning ? <CheckBoxDays disabled={true} days={rowData.daysWeek} /> : ""}
            <p>Heure : </p>
            <p>{rowData.departureTime}</p>
            <div className='flex justify-end'>
                {String(rowData.car.person.id) !== AuthService.getCurrentUserId() ?
                <Button appearance="primary" className='mr-4' onClick={() => booking(rowData)} >Réserver ce trajet</Button>
                : <Button appearance="primary" className='mr-4' >Vous êtes le chauffeur !</Button>}
            </div>
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

    return (
        <Table className='rounded-b-md bg-green-100'
            autoHeight={true}
            data={tableData}
            rowKey={rowKey}
            expandedRowKeys={expandedRowKeys}
            renderRowExpanded={renderRowExpanded}
            rowExpandedHeight={250}
        >
            <Column width={40} align="center">
                <HeaderCell></HeaderCell>
                <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
            </Column>
            <Column flexGrow={1.4}>
                <HeaderCell>{tableData.length !== 0 ? tableData[0].destination.isFromAfpa === true ? "Arrivée" : "Départ" : null}</HeaderCell>
                <Cell dataKey='destination.city.name' />
            </Column>
            <Column flexGrow={1} sortable>
                <HeaderCell>Heure</HeaderCell>
                <Cell dataKey="departureTime" />
            </Column>
            <Column flexGrow={0.7} sortable>
                <HeaderCell>Prix</HeaderCell>
                <Cell dataKey='price'>{rowData => rowPrice(rowData)}</Cell>
            </Column>
        </Table>
    )
}

export default RidesResultTable;