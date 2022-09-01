import {React, useState, useEffect} from 'react';
import { Table } from 'rsuite';
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";


const TableRides = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [columnsVisible, setColumnsVisible] = useState(props.columnsVisible);
    const [titleTable, setTitleTable] = useState(props.title);
    const { Column, HeaderCell, Cell } = Table;

    useEffect(() => {
        fetch("http://127.0.0.1:3001/covoiturafpa/rides")
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            console.log(result);
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
            <h5>{titleTable}</h5>
            <Table
            height={400}
            data={data}
            onRowClick={rowData => {
                console.log(rowData);
            }}>
                <Column width={150} align="center" fixed>
                    <HeaderCell>Destinations</HeaderCell>
                    <Cell>
                        {rowData => {
                            if(rowData.ride.destination.is_from_afpa) {
                                return(<p>AFPA <FiArrowRight/> { rowData.ride.destination.city.name}</p>)
                            }else if(!rowData.ride.destination.is_from_afpa) {
                                return(<p>{ rowData.ride.destination.city.name} <FiArrowRight/> AFPA</p>)
                            }
                        }}
                    </Cell>
                </Column>
                <Column width={150}>
                    <HeaderCell>Date</HeaderCell>
                    <Cell>
                    {rowData => {
                        if(rowData.id_one_time) {
                            return(rowData.departure_day)
                        }
                        if(rowData.id_recurring) {
                            return(rowData.days)
                        }
                    }}
                    </Cell>
                </Column>

                <Column width={150}>
                    <HeaderCell>heure</HeaderCell>
                    <Cell dataKey="ride.departure_time" />
                </Column>

                <Column width={70}>
                    <HeaderCell>Disponibilité</HeaderCell>
                    <Cell>
                        {rowData => {
                            console.log(rowData.ride.is_active);
                            if(rowData.ride.is_active === true) {
                                return (
                                    <span>
                                        <a> <FiEye/> </a>
                                    </span>
                                )
                            }else if(rowData.ride.is_active === false) {
                                return (
                                    <span>
                                        <a> <FiEyeOff/> </a>
                                    </span>
                                )
                            }
                        }
}
                    </Cell>
                </Column>
                <Column width={70} fixed="right">
                    <HeaderCell>Modif.</HeaderCell>
                    <Cell>
                    {rowData => (
                        <span>
                        <a onClick={() => alert(`id:${rowData.id}`)}> <FiEdit2/> </a>
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
/**
 * 
 * <Column width={130}>
                <HeaderCell>Last Name</HeaderCell>
                <Cell dataKey="lastName" />
            </Column>
            <Column width={100}>
                <HeaderCell>Gender</HeaderCell>
                <Cell dataKey="gender" />
            </Column>
            <Column width={100}>
                <HeaderCell>Age</HeaderCell>
                <Cell dataKey="age" />
            </Column>
            <Column width={200}>
                <HeaderCell>City</HeaderCell>
                <Cell dataKey="city" />
            </Column>
            <Column width={200}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
            </Column>
 */