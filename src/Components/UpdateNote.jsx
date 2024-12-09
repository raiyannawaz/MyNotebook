import { Modal } from 'react-bootstrap'
import { TextField, Button } from '@mui/material'
import Context from '../ContextAPI/Context'
import { useContext } from 'react'

const UpdateNote = () =>{

    let { isModal, setIsModal, isLoading, editNote, setEditNote, handleUpdateNote } = useContext(Context)

    const handleHideModal = () =>{
        setIsModal(false)
    }

    const handleChange = (event) =>{
        let { name, value } = event.target;
        setEditNote({...editNote, [name]: value})
    }

    return(
        <Modal show={isModal} onHide={handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Update Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField name='editTitle' fullWidth label='Title' size='small' className='mb-3' value={editNote.editTitle} onChange={handleChange}/>
                <TextField name='editDescription' fullWidth label='Description' size='small' className='mb-3' value={editNote.editDescription} onChange={handleChange}/>
                <TextField name='editTag' fullWidth label='Tag' size='small' value={editNote.editTag} onChange={handleChange}/>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={isLoading} variant='contained' onClick={handleUpdateNote}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateNote