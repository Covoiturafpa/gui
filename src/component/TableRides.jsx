import { React, useState, useEffect } from 'react';
import { Table, Pagination } from 'rsuite';
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { CheckBoxDays } from '../component/CheckBoxDays';


const TableRides = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [columnsVisible, setColumnsVisible] = useState(props.columnsVisible);
    const [titleTable, setTitleTable] = useState(props.title);
    const { Column, HeaderCell, Cell } = Table;
    const [limit, setLimit] = useState(10);
     const [page, setPage] = useState(1);

     
    useEffect(() => {
        fetch("http://127.0.0.1:3001/covoiturafpa/rides")
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
                <div>
                    <h5 className="text-center">{titleTable}</h5>
                </div>
                <Table
                    autoHeight={true}
                    data={data}
                    onRowClick={rowData => {
                        console.log(rowData);
                    }}>
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
                                    return (rowData.departure_day)
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
                                            <a> <FiEye /> </a>
                                        </span>
                                    )
                                } else if (rowData.is_active === false) {
                                    return (
                                        <span>
                                            <a> <FiEyeOff /> </a>
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
                                    <a onClick={() => alert(`id:${rowData.id}`)}> <FiEdit2 /> </a>
                                </span>
                            )}
                        </Cell>
                    </Column>
                </Table>

            </div>

        );
    }
}
export { TableRides };