import { React, useEffect, useState } from 'react';
import { Table, IconButton, Button, ButtonToolbar, Modal } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
import TrashIcon from '@rsuite/icons/Trash';
import  FetchService  from "../services/FetchService";

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [action, setAction] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userIdTarget, setUserIdTarget] = useState(null);

    useEffect(() => {
        console.log(props.users);
    },[]);
    const contentModal = (action, title, content, userId) => {
        handleOpen();
        setAction(action);
        setTitle(title);
        setContent(content);
        setUserIdTarget(userId);
    }

    const actionModal = (action, id) => {
        let json = {
            "op":"replace",
            "path":"/" + action.key,
            "value": action.value
        }
        const fetch = FetchService.patch(`/users/${id}/roles`, JSON.stringify(json));
        fetch.then(
            (result) => {
                
            }
        )
    }

    const renderRowExpanded = rowData => {
        return (<div>
            <p>Nom et Prénom : {rowData.firstName} {rowData.surname}</p>
            <p>Email : {rowData.email}</p>
            <p>Téléphone : {rowData.phoneNumber}</p>
            <p>Début d'activité : {rowData.startActivity}</p>
            {rowData.endActivity ? 
            <p>Fin d'activité :  {rowData.endActivity}</p>
            : ""}
            {rowData.formation ?
            <p>Formation : {rowData.formation.name}</p>
            : ""}
            
            {rowData.isTeacher ?
            <p>Formations :
                {rowData.taughtFormations.map(item => {
                    return (`${item.name},`)
                })}
            </p>
            : ""}
            <ButtonToolbar>
                {rowData.personType === "E" ?
                    <Button onClick={() => {contentModal({"isTeacher" : !rowData.isTeacher},
                                            `${rowData.isTeacher ? "supprimer" : "activer"} le rôle formateur`,
                                            `Voulez-vous ${rowData.isTeacher ? "supprimer" : "activer"} le rôle formateur à ${rowData.firstName} ${rowData.surname} ?`,
                                            rowData.id)}
                                    }
                            color={rowData.isTeacher ? "orange" : "green"}
                            appearance="primary">
                        {rowData.isTeacher ? "Supprimer le rôle": "Définir en"} formateur
                    </Button>
                : ""}
                {rowData.personType === "E" ?
                    <Button onClick={() => {contentModal({"isAdmin" : !rowData.isAdmin},
                                            `${rowData.isAdmin ? "supprimer" : "activer"} le rôle administrateur`,
                                            `Voulez-vous ${rowData.isAdmin ? "supprimer" : "activer"} le rôle administrateur à ${rowData.firstName} ${rowData.surname} ?`,
                                            rowData.id)}
                                    }
                            color={rowData.isAdmin ? "red" : "cyan"}
                            appearance="primary">
                        {rowData.isAdmin ? "Supprimer le rôle " : "Définir en "}administrateur
                    </Button>
                : ""}
                {rowData.isActivated ?
                    <Button onClick={() => {contentModal({"isActive" : false},
                                            "Désactiver le compte",
                                            `Voulez-vous vraiment désactiver le compte de ${rowData.firstName} ${rowData.surname} ?`,
                                            rowData.id)}
                                    }
                            color="yellow"
                            appearance="primary">
                        Désactiver
                    </Button>
                :
                    <Button onClick={() => {contentModal({"isActive" : true},
                                            "Activer le compte",
                                            `Voulez-vous activer le compte de ${rowData.firstName} ${rowData.surname} ?`,
                                            rowData.id)}
                                    }
                            appearance="primary">
                        Activer
                    </Button>
                }
                <Button onClick={() => {contentModal({"delete" : true},
                                        "Supprimer le compte",
                                        `Voulez-vous vraiment supprimer le compte de ${rowData.firstName} ${rowData.surname} ? Attention : Cette action est irréversible !`,
                                        rowData.id)}
                                }
                        color="red"
                        appearance="primary">
                    Supprimer
                </Button>
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
                rowExpandedHeight={230}
            >
                <Column flexGrow={0.2} align="center">
                    <HeaderCell>#</HeaderCell>
                    <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                </Column>
                <Column flexGrow={1}>
                    <HeaderCell>Nom & Prénom</HeaderCell>
                    <Cell>
                        {rowData => {
                            if (!rowData.isActivated) {
                                return <p className='text-red-600'>{rowData.firstName} {rowData.surname}</p>
                            } else {
                                return <p>{rowData.firstName} {rowData.surname}</p>

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
                                return <p className='text-red-600'>Employée</p>
                            }else {
                                return <p className='text-red-600'>Stagiaire</p>
                            }
                        } else {
                            if (rowData.personType === "E") {
                                return <p>Employée</p>
                            }else {
                                return <p>Stagiaire</p>
                            }

                        }}
                    }
                    </Cell>
                </Column>
            </Table>
            <Modal backdrop="static" keyboard={false} open={open} onClose={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{content}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {actionModal(action, userIdTarget)}} appearance="primary">Accepter</Button>
                        <Button onClick={handleClose} color="red" appearance="subtle">Annuler</Button>
                    </Modal.Footer>
                </Modal>
        </div>);
    }
    
}

export { UsersTable };