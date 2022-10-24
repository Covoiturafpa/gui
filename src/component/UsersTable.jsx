import { React, useEffect, useState } from 'react';
import { Table, IconButton, Button, ButtonToolbar } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import TrashIcon from '@rsuite/icons/Trash';


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

const UsersTable = (props) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    useEffect(() => {
        console.log(props.users);
    }, []);
    const renderRowExpanded = rowData => {
        return (<div>
            <ButtonToolbar>
                {rowData.isActivated ?
                    <Button color="yellow" appearance="primary">Désactiver</Button>
                :
                    <Button appearance="primary">Activer</Button>}
                
                <Button color="green" appearance="primary">Définir en administrateur</Button>
                <Button color="red" appearance="primary">Supprimmer</Button>
            </ButtonToolbar>
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

    if (props.users === 0) {
        return (
            <div>
                <div className="bg-gray-background rounded-t-md py-1">
                    <h5 className="text-center">Liste des utilisateurs</h5>
                    <p className='text-center'>Vous êtes en charge d'aucun utilisateurs</p>
                </div>
            </div>
        );
    }else {
        return (<div>
            <div className="bg-gray-background rounded-t-md py-1">
                <h5 className="text-center">Liste des utilisateurs</h5>
            </div>
            <Button color="red" appearance="primary">
                <TrashIcon /> utilisateurs inactifs
            </Button>
            <Table className='rounded-b-md'
                autoHeight={true}
                data={props.users}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                renderRowExpanded={renderRowExpanded}
                rowExpandedHeight={70}
            >
                <Column flexGrow={0.2} align="center">
                    <HeaderCell>#</HeaderCell>
                    <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Nom</HeaderCell>
                    <Cell>
                        {rowData => {
                            if (!rowData.isActivated) {
                                return <p className='text-yellow-600'>{rowData.surname}</p>
                            } else {
                                return <p >{rowData.surname}</p>

                            }
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Prénom</HeaderCell>
                    <Cell>
                        {rowData => {
                            if (!rowData.isActivated) {
                                return <p className='text-yellow-600'>{rowData.firstName}</p>
                            } else {
                                return <p >{rowData.firstName}</p>

                            }
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Fonction</HeaderCell>
                    <Cell>
                    {rowData => {
                        if (!rowData.isActivated) {
                            if (rowData.personType === "E") {
                                return <p className='text-yellow-600'>Employée</p>
                            }else {
                                return <p className='text-yellow-600'>Stagiaire</p>
                            }
                        } else {
                            if (rowData.personType === "E") {
                                return <p>Employée</p>
                            }else {
                                return <p>Stagiaire</p>
                            }

                        }
                        
                    }
                        
                    }
                    </Cell>
                </Column>
            </Table>
        </div>);
    }
    
}

export { UsersTable };