import { React, useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { FiEdit2, FiEye, FiEyeOff, FiArrowRight   } from "react-icons/fi";
import { CheckBoxDays } from './CheckBoxDays';
import { DetailOfRide } from './DetailOfRide';
import Moment from 'moment';

const TableProposedRides = (props) => {
    const [data, setData] = useState(props);
    const [onEdit, setOnEdit] = useState(null);
    const { Column, HeaderCell, Cell } = Table;
    console.log(props);


    useEffect(() => {

    },[onEdit]);

    function showDetail(ride){
        setOnEdit(ride);
    }
     

        if(onEdit) {
            return(<DetailOfRide isOwner={true} {...onEdit}/>);
        }else if(props.rides == 0){
            return (
                <div>
                    <div className="bg-white rounded-t-md py-1">
                        <h5 className="text-center">Mes trajets proposés</h5>
                        <p className='text-center'>Vous proposez aucun trajet</p>
                    </div>
                </div>
            );
        }else {
            return (
                <div>
                    <div className="bg-white rounded-t-md py-1">
                        <h5 className="text-center">Mes trajets proposés</h5>
                    </div>
                    <Table className='rounded-b-md'
                        autoHeight={true}
                        data={props.rides}>
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
                                        return ( <CheckBoxDays days={rowData.daysWeek}/>)
                                    }
                                }}
                            </Cell>
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>heure</HeaderCell>
                            <Cell dataKey="departureTime" />
                        </Column>

                        <Column flexGrow={0.5}>
                            <HeaderCell>Disponibilité</HeaderCell>
                            <Cell>
                                {rowData => {
                                    if (rowData.isActive === true) {
                                        return (
                                            <span>
                                                <a className="text-xl"> <FiEye /> </a>
                                            </span>
                                        )
                                    } else if (rowData.isActive === false) {
                                        return (
                                            <span>
                                                <a className="text-xl"> <FiEyeOff /> </a>
                                            </span>
                                        )
                                    }
                                }
                                }
                            </Cell>
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
export { TableProposedRides };