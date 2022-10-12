import { React, useState, useContext } from 'react';

import { Table, IconButton } from 'rsuite';

import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';

import { FiArrowRight } from "react-icons/fi";

import CheckBoxDays from '../CheckBoxDays/CheckBoxDays';

import Moment from 'moment';
import { RideFormContext } from './RideFormContextProvider';

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

function rowPrice(data) {
    return <p>{data.price}&euro;</p>
}

const RidesResultTable = (props) => {

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const { rides, isFromAfpa } = useContext(RideFormContext);

    const renderRowExpanded = rowData => {
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

    return (
        <Table className='rounded-b-md bg-green-100'
            autoHeight={true}
            data={rides.value}
            rowKey={rowKey}
            expandedRowKeys={expandedRowKeys}
            renderRowExpanded={renderRowExpanded}
            rowExpandedHeight={200}
        >
            <Column width={40} align="center">
                <HeaderCell></HeaderCell>
                <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
            </Column>
            <Column flexGrow={1.4}>
                <HeaderCell>{rides.value[0].destination.isFromAfpa === true ? "Arrivée" : "Départ"}</HeaderCell>
                <Cell dataKey='destination.city.name' />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell>Heure</HeaderCell>
                <Cell dataKey="departureTime" />
            </Column>
            <Column flexGrow={0.7}>
                <HeaderCell>Prix</HeaderCell>
                <Cell dataKey='price'>{rowData => rowPrice(rowData)}</Cell>
            </Column>
        </Table>
    )
}

export default RidesResultTable;