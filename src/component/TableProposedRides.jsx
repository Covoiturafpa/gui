import { React, useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { FiEdit2, FiEye, FiEyeOff, FiArrowRight   } from "react-icons/fi";
import { CheckBoxDays } from './CheckBoxDays';
import { DetailOfRide } from './DetailOfRide';
import Moment from 'moment';

const TableProposedRides = () => {
    const [error, setError] = useState(null);
    const [onEdit, setOnEdit] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const { Column, HeaderCell, Cell } = Table;

    useEffect(() => {
        fetch("http://127.0.0.1:3001/covoiturafpa/rides")
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setData(result);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, []);

    useEffect(() => {

    },[onEdit]);

    function showDetail(ride){
        setOnEdit(ride);
    }
     
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement...</div>;
        } else if(onEdit) {
            return(<DetailOfRide isOwner={true} {...onEdit}/>);
        }else {
            return (
                <div>
                    <div className="bg-white rounded-t-md py-1">
                        <h5 className="text-center">Mes trajets proposés</h5>
                    </div>
                    <Table className='rounded-b-md'
                        autoHeight={true}
                        data={data}>
                        <Column align="center" flexGrow={2}>
                            <HeaderCell>Destinations</HeaderCell>
                            <Cell>
                                {rowData => {
                                    if (rowData.destination.is_from_afpa) {
                                        return (<p className='flex justify-center align-center'>AFPA <FiArrowRight className='mx-2' /> {rowData.destination.city.name}</p>)
                                    } else if (!rowData.destination.is_from_afpa) {
                                        return (<p className='flex justify-center'>{rowData.destination.city.name} <FiArrowRight className='mx-2' /> AFPA</p>)
                                    }
                                }}
                            </Cell>
                        </Column>
                        <Column flexGrow={2}>
                            <HeaderCell>Date</HeaderCell>
                            <Cell>
                                {rowData => {
                                    if (rowData.id_one_time) {
                                        return (Moment(rowData.departure_day).format("DD/MM/YYYY"))
                                    }
                                    if (rowData.id_recurring) {
                                        return ( <CheckBoxDays {...rowData.days}/>)
                                    }
                                }}
                            </Cell>
                        </Column>
                        <Column flexGrow={1}>
                            <HeaderCell>heure</HeaderCell>
                            <Cell dataKey="departure_time" />
                        </Column>
                        <Column flexGrow={0.5}>
                            <HeaderCell>Disponibilité</HeaderCell>
                            <Cell>
                                {rowData => {
                                    if (rowData.is_active === true) {
                                        return (
                                            <span>
                                                <a className='text-xl'> <FiEye /> </a>
                                            </span>
                                        )
                                    } else if (rowData.is_active === false) {
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
                                        <a className="text-xl cursor-pointer" onClick={()=> { showDetail(rowData)}}> <FiEdit2 /> </a>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                </div>
            );
        }
    
}
export { TableProposedRides };