import React from 'react';
import { Modal, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';

const DeleteAccountModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<>
            <Button appearance="subtle" size='xs' onClick={handleOpen} >Supprimer son compte</Button>
            <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
                    <p className='mt-2'>Attention, cette action est définitive et vos données ne pourront pas être récupérées.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="primary" color='red'>
                        Supprimer mon compte
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Annuler
                    </Button>
                </Modal.Footer>
            </Modal>
    </>);
}

export { DeleteAccountModal };
